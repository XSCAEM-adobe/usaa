/* eslint-disable no-console */

/*
 * Library Import — copy a DA block library (docs + templates) from a SOURCE
 * org/site into THIS site, cross-org, using your own DA session.
 *
 * Why this exists: the `cloneit` tool is hardcoded to a single org (`scdemos`)
 * and DA's `/copy` API only copies within one org. The DA List + Source APIs,
 * however, authorize per-org from your token — so if you have access to both the
 * source and destination orgs, we can GET each file from the source and POST it
 * to the destination directly. No privileged worker required.
 *
 * Must be opened from a DA context (embedded via https://da.live/app/<org>/<site>/...)
 * so DA_SDK can supply your org/site/token. Opened standalone it will fall back
 * to a mock context and every call will 401.
 */

const DA_SDK_URL = 'https://da.live/nx/utils/sdk.js';
const DA_CONSTANTS_URL = 'https://da.live/nx/public/utils/constants.js';

// Text types get scdemos→dest reference rewriting; everything else copies as bytes.
const TEXT_EXTS = new Set(['html', 'json', 'svg', 'xml', 'txt', 'md', 'css', 'js', 'yaml', 'yml']);
const MEDIA_RE = /\.(html|json|svg|xml|txt|md|css|js|yaml|yml|png|jpe?g|gif|webp|pdf|mp4|woff2?)$/i;
// Folders never worth copying for a library import.
const SKIP_FOLDERS = new Set(['drafts', 'demo-docs', '.git']);

const state = {
  daFetch: null,
  daOrigin: 'https://admin.da.live',
  dst: { org: '', site: '' },
};

const el = (id) => document.getElementById(id);

function log(msg, kind = '') {
  const line = document.createElement('div');
  line.className = `log-line ${kind}`.trim();
  line.textContent = msg;
  el('log').appendChild(line);
  el('log').scrollTop = el('log').scrollHeight;
}

function setBusy(busy) {
  el('start').disabled = busy;
  el('start').textContent = busy ? 'Working…' : 'Start import';
}

const b64ToBytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const utf8ToBytes = (str) => new TextEncoder().encode(str);

function extOf(name) {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : '';
}

// ---- DA API helpers (all via your daFetch session) ----

async function listFolder(org, site, basePath) {
  const part = basePath ? `/${basePath.replace(/^\/+/, '')}` : '';
  const resp = await state.daFetch(`${state.daOrigin}/list/${org}/${site}${part}`);
  if (!resp.ok) throw new Error(`list ${basePath || '/'} → ${resp.status}`);
  const data = await resp.json();
  return Array.isArray(data) ? data : (data.sources || data.children || []);
}

/** Recursively collect file paths (relative to site root) under basePath. */
async function collectFiles(org, site, basePath, out = []) {
  const items = await listFolder(org, site, basePath);
  const prefix = `${org}/${site}`;
  for (const item of items) {
    const name = item.name || '';
    const isFile = item.lastModified != null && (item.ext || MEDIA_RE.test(name));
    const isFolder = !item.ext && item.lastModified == null && name && name !== '.DS_Store';
    if (isFolder) {
      if (SKIP_FOLDERS.has(name)) continue;
      const sub = basePath ? `${basePath}/${name}` : name;
      await collectFiles(org, site, sub, out);
      continue;
    }
    if (!isFile) continue;
    const raw = (item.path || '').replace(/^\/+/, '');
    let rel = raw.startsWith(prefix) ? raw.slice(prefix.length).replace(/^\/+/, '') : '';
    if (!rel) rel = basePath ? `${basePath}/${name}` : name;
    out.push({ rel, ext: (item.ext || extOf(name)).toLowerCase() });

    // DA stores per-doc assets (e.g. images) in a hidden sibling folder ".<docname>".
    if ((item.ext || extOf(name)) === 'html') {
      const base = name.replace(/\.html$/i, '');
      const hidden = basePath ? `${basePath}/.${base}` : `.${base}`;
      try {
        const sub = await listFolder(org, site, hidden);
        if (sub.length) await collectFiles(org, site, hidden, out);
      } catch { /* no hidden folder — fine */ }
    }
  }
  return out;
}

async function getSource(org, site, rel, asText) {
  const resp = await state.daFetch(`${state.daOrigin}/source/${org}/${site}/${rel}`);
  if (!resp.ok) throw new Error(`get ${rel} → ${resp.status}`);
  return asText ? resp.text() : resp.blob();
}

async function putSource(org, site, rel, bytesOrText, mime) {
  const filename = rel.split('/').pop() || 'index.html';
  const body = typeof bytesOrText === 'string' ? utf8ToBytes(bytesOrText) : bytesOrText;
  const fd = new FormData();
  fd.append('data', new Blob([body], { type: mime || 'application/octet-stream' }), filename);
  const resp = await state.daFetch(`${state.daOrigin}/source/${org}/${site}/${rel}`, {
    method: 'POST',
    body: fd,
  });
  if (!resp.ok) {
    const detail = resp.headers.get('x-error') || (await resp.text().catch(() => ''));
    throw new Error(`put ${rel} → ${resp.status} ${detail}`);
  }
}

/** Rewrite source-org content references to the destination org/site. */
function rewriteRefs(text, srcOrg, srcSite, dstOrg, dstSite) {
  const from = `content.da.live/${srcOrg}/${srcSite}/`;
  const to = `content.da.live/${dstOrg}/${dstSite}/`;
  // case-insensitive on the org segment; keep the rest verbatim
  const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return text.split('\n').map((l) => l.replace(re, to)).join('\n');
}

// ---- main flow ----

async function run() {
  el('log').innerHTML = '';
  const srcOrg = el('src-org').value.trim();
  const srcSite = el('src-site').value.trim();
  const dstOrg = el('dst-org').value.trim();
  const dstSite = el('dst-site').value.trim();
  const paths = el('paths').value.split(',').map((p) => p.trim()).filter(Boolean);
  const dryRun = el('dry-run').checked;
  const doRewrite = el('rewrite').checked;

  if (!srcOrg || !srcSite || !dstOrg || !dstSite || !paths.length) {
    log('Fill in source, destination, and at least one path.', 'err');
    return;
  }
  if (`${srcOrg}/${srcSite}` === `${dstOrg}/${dstSite}`) {
    log('Source and destination are the same — nothing to do.', 'err');
    return;
  }

  setBusy(true);
  try {
    log(`Source:      ${srcOrg}/${srcSite}`);
    log(`Destination: ${dstOrg}/${dstSite}`);
    log(`Paths:       ${paths.join(', ')}`);
    log(dryRun ? 'Mode: DRY RUN (listing only, no writes)' : 'Mode: LIVE (writing to destination)', dryRun ? '' : 'warn');
    log('—'.repeat(30));

    // 1) enumerate
    let files = [];
    for (const p of paths) {
      log(`Listing ${p} …`);
      const found = await collectFiles(srcOrg, srcSite, p);
      log(`  ${found.length} file(s)`);
      files = files.concat(found);
    }
    // de-dupe
    const seen = new Set();
    files = files.filter((f) => (seen.has(f.rel) ? false : seen.add(f.rel)));
    log(`Total: ${files.length} file(s) to copy.`);
    log('—'.repeat(30));

    if (dryRun) {
      files.forEach((f) => log(`would copy  ${f.rel}`));
      log('Dry run complete — no changes written.', 'ok');
      return;
    }

    // 2) copy
    let ok = 0;
    let fail = 0;
    for (let i = 0; i < files.length; i += 1) {
      const { rel, ext } = files[i];
      const asText = TEXT_EXTS.has(ext);
      try {
        let payload = await getSource(srcOrg, srcSite, rel, asText);
        let mime = 'application/octet-stream';
        if (asText) {
          if (doRewrite) payload = rewriteRefs(payload, srcOrg, srcSite, dstOrg, dstSite);
          mime = ext === 'json' ? 'application/json' : `text/${ext === 'html' ? 'html' : 'plain'}`;
        }
        await putSource(dstOrg, dstSite, rel, payload, mime);
        ok += 1;
        log(`[${i + 1}/${files.length}] ✓ ${rel}`);
      } catch (e) {
        fail += 1;
        log(`[${i + 1}/${files.length}] ✗ ${rel} — ${e.message}`, 'err');
      }
    }
    log('—'.repeat(30));
    log(`Done. ${ok} copied, ${fail} failed.`, fail ? 'warn' : 'ok');
    if (ok) {
      log('Next: open the DA Bulk app to Preview/Publish the copied docs so the', 'ok');
      log(`library resolves: https://da.live/apps/bulk (site ${dstOrg}/${dstSite}).`, 'ok');
    }
  } catch (e) {
    log(`Fatal: ${e.message}`, 'err');
  } finally {
    setBusy(false);
  }
}

async function init() {
  try {
    const [{ default: DA_SDK }, consts] = await Promise.all([
      import(DA_SDK_URL),
      import(DA_CONSTANTS_URL).catch(() => ({})),
    ]);
    if (consts && consts.DA_ORIGIN) state.daOrigin = consts.DA_ORIGIN;
    const sdk = await DA_SDK;
    const { context, actions } = sdk;
    if (!actions?.daFetch) throw new Error('no daFetch — open this tool from a DA context');
    state.daFetch = actions.daFetch;

    // default destination = the site this tool is embedded in
    const dstOrg = context?.org || context?.owner || '';
    const dstSite = context?.repo || context?.site || '';
    if (dstOrg) el('dst-org').value = dstOrg;
    if (dstSite) el('dst-site').value = dstSite;
    el('status').textContent = dstOrg
      ? `Connected · destination ${dstOrg}/${dstSite}`
      : 'Connected · set destination below';
    el('status').className = 'status ok';
  } catch (e) {
    el('status').textContent = `Not connected: ${e.message}. Open via https://da.live/app/<org>/<site>/tools/library-import/library-import`;
    el('status').className = 'status err';
  }
  el('start').addEventListener('click', run);
}

init();
