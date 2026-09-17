# Library Import

Copy a DA block library (block docs + templates) from **another org/site** into
**this** site — cross-org — using your own Document Authoring session.

## Why this tool exists

- `cloneit` is hardcoded to a single org (`scdemos`) and clones a whole baseline
  into a **new `scdemos` site** — it can't target another org.
- The DA `/copy` API only copies **within one org**.
- The DA **List** and **Source** APIs authorize **per-org from your token**. So if
  you have access to both the source and destination orgs, you can `GET` each file
  from the source and `POST` it to the destination directly — no privileged worker.

This tool does exactly that for a scoped set of paths (default: `docs/library`),
so a bbird-based site (whose block *code* came from `scdemos/demo`) can get the
matching block *library* it needs for authoring.

## How to run

1. Merge this tool to `main` so it deploys.
2. Open it **embedded in DA** (this is required — DA_SDK supplies your org/site/token):
   ```
   https://da.live/app/<org>/<site>/tools/library-import/library-import
   ```
   e.g. `https://da.live/app/xscaem-adobe/usaa/tools/library-import/library-import`
   (no file extension). Opening the raw `aem.page` URL runs it standalone and every
   call 401s.
3. Confirm the status line shows **Connected**. Destination org/site auto-fill from
   the DA context; source defaults to `scdemos / demo`.
4. Leave **Dry run** checked and click **Start import** to see exactly what would
   copy.
5. Uncheck **Dry run** and run again to write the files into the destination.
6. Open the [DA Bulk app](https://da.live/apps/bulk) to **Preview/Publish** the
   copied docs so the library resolves.

## Notes

- **Rewrite references** (on by default) rewrites `content.da.live/<src-org>/<src-site>/`
  URLs inside text files to the destination, so a copied `blocks.json` and any
  block docs point at your own content.
- Skips `drafts`, `demo-docs`, and `.git`.
- Text files (`html/json/svg/css/js/yaml/…`) are rewritten; binaries (images, pdf,
  fonts) copy as bytes.
- Per-doc hidden asset folders (`.<docname>`) are followed so block images come too.
