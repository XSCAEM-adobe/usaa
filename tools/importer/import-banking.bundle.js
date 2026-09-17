/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-banking.js
  var import_banking_exports = {};
  __export(import_banking_exports, {
    default: () => import_banking_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document: document2 }) {
    const bgImage = element.querySelector('.mkt_mainB_right img, img[src*=".jpg"], img[src*=".jpeg"], picture') || element.querySelector("img");
    const contentRoot = element.querySelector(".mkt_mainB_left") || element;
    const heading = contentRoot.querySelector('h1, h2, .hero-heading, [class*="title"]');
    const subheading = contentRoot.querySelector("h2:not(:first-of-type), h3:not(.rds-globals__screen-reader)");
    const paragraphs = Array.from(contentRoot.querySelectorAll(":scope > p, .mkt_mainB_left > p, p")).filter((p) => p.textContent.trim().length > 0);
    const ctaLinks = Array.from(contentRoot.querySelectorAll('a.button, a.rds-button__primary, a[class*="button"]'));
    if (!heading && paragraphs.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const seen = /* @__PURE__ */ new Set();
    const pushUnique = (node, arr) => {
      const key = `${node.tagName}:${(node.textContent || "").replace(/\s+/g, " ").trim()}`;
      if (!key.endsWith(":") && seen.has(key)) return;
      seen.add(key);
      arr.push(node);
    };
    const contentCell = [];
    if (heading) pushUnique(heading, contentCell);
    const allHeadings = Array.from(contentRoot.querySelectorAll("h1, h2, h3")).filter((h) => !h.classList.contains("rds-globals__screen-reader") && h !== heading);
    allHeadings.forEach((h) => pushUnique(h, contentCell));
    paragraphs.forEach((p) => pushUnique(p, contentCell));
    const ctaSeen = /* @__PURE__ */ new Set();
    ctaLinks.forEach((a) => {
      const href = a.getAttribute("href") || a.textContent.trim();
      if (ctaSeen.has(href)) return;
      ctaSeen.add(href);
      contentCell.push(a);
    });
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse2(element, { document: document2 }) {
    let items = Array.from(element.querySelectorAll(".usaa-aem-feature-item"));
    if (!items.length) {
      items = Array.from(element.querySelectorAll(".pd-gtb-benefit"));
    }
    const cells = [];
    items.forEach((item) => {
      const image = item.querySelector(".aem-feature-collection__illustration img, .pd-gtb-icon, img, picture");
      const textCell = [];
      const heading = item.querySelector(".aem-feature-collection__text h3, .pd-gtb-benefit-text h3, h3, h2, h4");
      if (heading) textCell.push(heading);
      const paragraphs = Array.from(item.querySelectorAll(".rds-typography__paragraph p, .pd-gtb-benefit-text p, p"));
      paragraphs.forEach((p) => textCell.push(p));
      if (image || textCell.length) {
        cells.push([image || "", textCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-feature", cells });
    const introHeading = element.querySelector(".horizontal-feature-collection h2, .pd-gtb-heading, h2");
    const cta = element.querySelector(".usaa-aem-feature-collection__cta--horizontal a, a.rds-button__secondary");
    const nodes = [];
    if (introHeading) nodes.push(introHeading);
    nodes.push(block);
    if (cta) nodes.push(cta);
    element.replaceWith(...nodes);
  }

  // tools/importer/parsers/columns-spotlight.js
  function parse3(element, { document: document2 }) {
    const spotlight = element.querySelector(".aem-feature-spotlight") || element;
    const imageColumn = spotlight.querySelector(".aem-feature-spotlight__image-column") || element.querySelector(".aem-feature-spotlight__image-column");
    const textColumn = Array.from(spotlight.querySelectorAll(".rds-layout__grid-column-md-6")).find((col) => col !== imageColumn && col.textContent.trim().length > 0);
    let image = null;
    if (imageColumn) {
      image = imageColumn.querySelector(".aem-feature-spotlight__image-16x9") || imageColumn.querySelector('img:not([src^="data:"])');
    }
    const textCell = [];
    if (textColumn) {
      const heading = textColumn.querySelector("h1, h2, h3");
      if (heading) textCell.push(heading);
      Array.from(textColumn.querySelectorAll(".rds-typography__paragraph-large p, .rds-typography__paragraph-large ul, p, ul")).filter((n) => !n.closest("a")).filter((n) => n.tagName === "UL" || n.textContent.replace(/ /g, "").trim().length > 0).filter((n, i, arr) => !arr.some((o) => o !== n && o.contains(n))).forEach((n) => textCell.push(n));
      Array.from(textColumn.querySelectorAll("a[href]")).forEach((a) => {
        const cta = a.cloneNode(true);
        cta.querySelectorAll("img, svg").forEach((n) => n.remove());
        textCell.push(cta);
      });
    }
    if (!textCell.length && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const imageCell = image || "";
    const isImageRight = !!spotlight.querySelector(".aem-feature-spotlight--image-right") || !!element.querySelector(".aem-feature-spotlight--image-right") || (spotlight.className || "").includes("image-right");
    const row = isImageRight ? [textCell, imageCell] : [imageCell, textCell];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-spotlight", cells: [row] });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-steps.js
  function parse4(element, { document: document2 }) {
    const stepList = element.querySelector("ol.usaa-step-list") || element;
    const steps = Array.from(stepList.querySelectorAll(":scope > li.step, li.step"));
    const cells = [];
    steps.forEach((step) => {
      const headlineEl = step.querySelector('.usaa-step-headline, [class*="step-headline"]');
      const bodyEl = step.querySelector('.usaa-step-body-text, [class*="step-body"]');
      const cellContent = [];
      if (headlineEl) {
        const heading = document2.createElement("h3");
        heading.innerHTML = headlineEl.innerHTML.trim();
        cellContent.push(heading);
      }
      if (bodyEl) {
        Array.from(bodyEl.childNodes).forEach((node) => cellContent.push(node));
      }
      if (cellContent.length) cells.push([cellContent]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-steps", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-rate.js
  function parse5(element, { document: document2 }) {
    const tables = Array.from(element.querySelectorAll("table"));
    const table = tables.find((t) => !t.classList.contains("rds-table--stacked")) || tables[0];
    if (!table) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    const headerCells = Array.from(table.querySelectorAll("thead th, thead td"));
    if (headerCells.length) {
      cells.push(headerCells.map((c) => {
        const div = document2.createElement("div");
        div.textContent = (c.textContent || "").trim();
        return div;
      }));
    }
    const bodyRows = Array.from(table.querySelectorAll("tbody > tr"));
    bodyRows.forEach((tr) => {
      const rowCells = Array.from(tr.children).map((cell) => {
        const div = document2.createElement("div");
        Array.from(cell.childNodes).forEach((node) => div.append(node.cloneNode(true)));
        if (!div.textContent.trim() && !div.querySelector("img")) {
          div.textContent = (cell.textContent || "").trim();
        }
        return div;
      });
      if (rowCells.length) cells.push(rowCells);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const colCount = Math.max(...cells.map((r) => r.length));
    cells.forEach((row) => {
      while (row.length < colCount) row.push("");
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "table-rate", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/faq-expand.js
  function parse6(element, { document: document2 }) {
    const sections = Array.from(element.querySelectorAll('.rds-accordion__section, [class*="accordion-section"]'));
    const cells = [];
    sections.forEach((section) => {
      const trigger = section.querySelector('.rds-accordion__trigger, [class*="trigger"]');
      let question = "";
      if (trigger) {
        const clone = trigger.cloneNode(true);
        clone.querySelectorAll("img, .rds-globals__screen-reader").forEach((n) => n.remove());
        question = (clone.textContent || "").trim();
      }
      const panel = section.querySelector('.rds-accordion__panel, [class*="panel"]');
      const answerContent = [];
      if (panel) {
        Array.from(panel.childNodes).forEach((node) => answerContent.push(node.cloneNode(true)));
      }
      if (!question) return;
      const questionCell = document2.createElement("div");
      questionCell.textContent = question;
      const answerCell = document2.createElement("div");
      answerContent.forEach((node) => answerCell.append(node));
      cells.push([questionCell, answerCell]);
    });
    if (!cells.length) {
      const heading = element.querySelector("h2, h3");
      element.replaceWith(...heading ? [heading] : []);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "faq-expand", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse7(element, { document: document2 }) {
    let cards = Array.from(element.querySelectorAll(".usaa-aem-card-ac__individualCard, article.rds-card"));
    if (!cards.length) {
      cards = Array.from(element.querySelectorAll(".article-teaser-child, article.aem-article-teaser__teaser"));
    }
    if (!cards.length) {
      cards = Array.from(element.querySelectorAll(".article-column-child-container, .article-column"));
    }
    cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector('.rds-card__image img, .article-teaser-child-image img, .article-image-container img, img:not([src^="data:"])');
      const textCell = [];
      const heading = card.querySelector(".rds-card__body h3, .aem-article-teaser-child-header h3, h3, h4");
      if (heading) textCell.push(heading);
      const paragraphs = Array.from(card.querySelectorAll(".rds-card__body p, p"));
      paragraphs.forEach((p) => textCell.push(p));
      const ctaSrc = card.querySelector(".usaa-aem-card-ac__action-block a, a.rds-button__secondary, a.rds-button__tertiary, a[href]");
      if (ctaSrc) {
        const cta = ctaSrc.cloneNode(true);
        cta.querySelectorAll("img, svg").forEach((n) => n.remove());
        textCell.push(cta);
      }
      if (image || textCell.length) {
        cells.push([image || "", textCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    const introHeading = element.querySelector(".usaa-aem-card-pack-ac h2, .usaa-article-teaser-container h2, h2");
    const introPara = element.querySelector(".usaa-article-teaser-container > p, .rds-typography__paragraph-large p, .rds-typography__paragraph-large");
    const nodes = [];
    if (introHeading) nodes.push(introHeading);
    if (introPara && introPara !== introHeading) nodes.push(introPara);
    nodes.push(block);
    element.replaceWith(...nodes);
  }

  // tools/importer/parsers/hero-callout.js
  function parse8(element, { document: document2 }) {
    const content = element.querySelector('.aem-callout-block__illustration-group-content, [class*="illustration-group-content"]') || element;
    const headingSrc = content.querySelector('h1, h2, h3, [class*="headline-1"], [class*="headline-2"]');
    const ctaLinks = Array.from(content.querySelectorAll('a[class*="button"], a.rds-button__primary, a.rds-button__tertiary')).filter((a, i, arr) => arr.indexOf(a) === i);
    const descSrc = content.querySelector('p, [class*="paragraph-large"]');
    const textCell = [];
    if (headingSrc) {
      const h = document2.createElement("h2");
      h.innerHTML = headingSrc.innerHTML.trim();
      textCell.push(h);
    }
    if (descSrc && descSrc.textContent.trim()) {
      const p = document2.createElement("p");
      p.innerHTML = descSrc.innerHTML.trim();
      textCell.push(p);
    }
    ctaLinks.forEach((a) => {
      const link = a.cloneNode(true);
      link.querySelectorAll(".rds-globals__screen-reader, br").forEach((n) => n.remove());
      link.textContent = (link.textContent || "").trim();
      const wrap = document2.createElement("p");
      wrap.append(link);
      textCell.push(wrap);
    });
    const illustration = element.querySelector('.aem-callout-block__illustration-group-illustration, [class*="illustration-group-illustration"]');
    let imageEl = null;
    if (illustration) {
      imageEl = Array.from(illustration.querySelectorAll("img")).find((img) => img.getAttribute("src") && !img.getAttribute("src").startsWith("data:"));
    }
    if (!textCell.length && !imageEl) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const row = imageEl ? [textCell, [imageEl]] : [textCell];
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-callout", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-links.js
  function parse9(element, { document: document2 }) {
    const columns = Array.from(element.querySelectorAll(".rds-layout__grid-row.levelOne > div, .wayfinding-select-display > div")).filter((c) => c.querySelector("h3, ul"));
    const row = [];
    columns.forEach((col) => {
      const cell = [];
      const heading = col.querySelector("h3, h4");
      if (heading) cell.push(heading);
      const list = col.querySelector("ul");
      if (list) cell.push(list);
      const ctaSrc = col.querySelector(".usaa-aem-wayfinding-block-child__action-block a, a.rds-button__tertiary, a[href]:not(.rds-typography__text-link)");
      if (ctaSrc) {
        const cta = ctaSrc.cloneNode(true);
        cta.querySelectorAll("img, svg").forEach((n) => n.remove());
        cell.push(cta);
      }
      if (cell.length) row.push(cell);
    });
    if (!row.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-links", cells: [row] });
    const sectionHeading = element.querySelector(":scope h2, h2");
    const nodes = [];
    if (sectionHeading) nodes.push(sectionHeading);
    nodes.push(block);
    element.replaceWith(...nodes);
  }

  // tools/importer/transformers/usaa-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".globalPageHeader-navMask"
        // nav overlay mask
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".server-name",
        ".skeleton-loader",
        ".skeleton-loader-variation",
        'a[style*="display:none"]',
        'a[style*="display: none"]'
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "a.usaa-skipToContent",
        // "Skip to Content" link (home page markup)
        'a[href="#body-wrapper--main"]',
        // "Skip to Content" link (banking markup)
        ".usaa-globalHeader",
        // global site header wrapper
        "header",
        // header element (global nav)
        "footer",
        // page footer element
        ".usaa-globalFooterNav",
        // footer navigation
        "#usaa-footer-content",
        // footer disclosures/content
        ".pageFooter-notes"
        // footer legal notes
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe",
        // Optimizely, TTD, DoubleClick tracking frames
        "#ttdUniversalPixelTag",
        "#universal_pixel_lr62s7z",
        "img.ywa-10000",
        // Yahoo analytics pixel
        ".usaa-globalNav-helpContainer",
        // empty help container
        "link",
        "noscript",
        "script"
      ]);
    }
  }

  // tools/importer/transformers/usaa-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function querySection(root, selectors) {
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (el) return el;
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = querySection(element, section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || querySection(element, section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-banking.js
  var PAGE_TEMPLATE = {
    "name": "banking",
    "urls": [
      "https://www.usaa.com/banking/checking?wa_ref=pub_home_banner_bank_checking"
    ],
    "representativeUrl": "https://www.usaa.com/banking/checking?wa_ref=pub_home_banner_bank_checking",
    "description": "USAA checking / banking product page",
    "blocks": [
      {
        "name": "hero-banner",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(1)"
        ]
      },
      {
        "name": "cards-feature",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.feature-collection-authored-content.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(3)",
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.feature-collection-authored-content.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(5)"
        ]
      },
      {
        "name": "columns-spotlight",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(1)",
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(6)",
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)"
        ]
      },
      {
        "name": "cards-steps",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4)"
        ]
      },
      {
        "name": "table-rate",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-data-table.aem-GridColumn.aem-GridColumn--default--12"
        ]
      },
      {
        "name": "faq-expand",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-faq-block.aem-GridColumn.aem-GridColumn--default--12"
        ]
      },
      {
        "name": "cards-article",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.article-teaser.aem-GridColumn.aem-GridColumn--default--12"
        ]
      },
      {
        "name": "hero-callout",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(9)"
        ]
      },
      {
        "name": "columns-links",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-wayfinding-block.aem-GridColumn.aem-GridColumn--default--12"
        ]
      }
    ],
    "urlPattern": "/banking/*",
    "sections": [
      {
        "id": "1",
        "name": "fdic-disclosure-strip",
        "selector": [
          "#body-wrapper--main > p.bk-fdic-banner"
        ],
        "style": "accent",
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "2",
        "name": "hero",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(1)"
        ],
        "style": null,
        "blocks": [
          "hero-banner"
        ],
        "defaultContent": []
      },
      {
        "id": "3",
        "name": "value-features",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.feature-collection-authored-content.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(3)"
        ],
        "style": null,
        "blocks": [
          "cards-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "4",
        "name": "youth-spotlight",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(1)"
        ],
        "style": "grey",
        "blocks": [
          "columns-spotlight"
        ],
        "defaultContent": []
      },
      {
        "id": "5",
        "name": "how-it-works-steps",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4)"
        ],
        "style": null,
        "blocks": [
          "cards-steps"
        ],
        "defaultContent": []
      },
      {
        "id": "6",
        "name": "everyday-features",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.feature-collection-authored-content.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(5)"
        ],
        "style": "grey",
        "blocks": [
          "cards-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "7",
        "name": "military-billboard",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(6)"
        ],
        "style": null,
        "blocks": [
          "columns-spotlight"
        ],
        "defaultContent": []
      },
      {
        "id": "8",
        "name": "recruits-spotlight",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)"
        ],
        "style": null,
        "blocks": [
          "columns-spotlight"
        ],
        "defaultContent": []
      },
      {
        "id": "9",
        "name": "rate-table",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-data-table.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "table-rate"
        ],
        "defaultContent": []
      },
      {
        "id": "10",
        "name": "rate-legal-disclosure",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.legal-block.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "11",
        "name": "faq",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-faq-block.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "grey",
        "blocks": [
          "faq-expand"
        ],
        "defaultContent": []
      },
      {
        "id": "12",
        "name": "related-articles",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.article-teaser.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "cards-article"
        ],
        "defaultContent": []
      },
      {
        "id": "13",
        "name": "closing-cta-banner",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.profiled-content-container.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(9)"
        ],
        "style": "dark",
        "blocks": [
          "hero-callout"
        ],
        "defaultContent": []
      },
      {
        "id": "14",
        "name": "related-banking-needs",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-wayfinding-block.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "grey",
        "blocks": [
          "columns-links"
        ],
        "defaultContent": []
      }
    ]
  };
  var parsers = {
    "hero-banner": parse,
    "cards-feature": parse2,
    "columns-spotlight": parse3,
    "cards-steps": parse4,
    "table-rate": parse5,
    "faq-expand": parse6,
    "cards-article": parse7,
    "hero-callout": parse8,
    "columns-links": parse9
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        let elements = [];
        try {
          elements = document2.querySelectorAll(selector);
        } catch (e) {
          console.warn(`Invalid selector for ${blockDef.name}: ${selector}`);
          return;
        }
        if (elements.length === 0) console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_banking_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{ element: main, path, report: { title: document2.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
    }
  };
  return __toCommonJS(import_banking_exports);
})();
