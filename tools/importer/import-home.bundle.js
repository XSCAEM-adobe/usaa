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

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
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
    const contentCell = [];
    if (heading) contentCell.push(heading);
    const allHeadings = Array.from(contentRoot.querySelectorAll("h1, h2, h3")).filter((h) => !h.classList.contains("rds-globals__screen-reader") && h !== heading);
    allHeadings.forEach((h) => contentCell.push(h));
    paragraphs.forEach((p) => contentCell.push(p));
    ctaLinks.forEach((a) => contentCell.push(a));
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse2(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(".mkt_acqCard"));
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".acqC_img img, img, picture");
      const textCell = [];
      const heading = card.querySelector(".acqC_copy h2, .acqC_copy h3, h2, h3");
      if (heading) textCell.push(heading);
      const desc = card.querySelector(".acqCC_copy p, .acqCardContent p, p");
      if (desc) textCell.push(desc);
      const cta = card.querySelector(".acqCC_btn a, a.button, a[href]");
      if (cta) textCell.push(cta);
      if (image || textCell.length) {
        cells.push([image || "", textCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-product", cells });
    element.replaceWith(block);
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

  // tools/importer/parsers/cards-feature.js
  function parse4(element, { document: document2 }) {
    const items = Array.from(element.querySelectorAll(".usaa-aem-feature-item"));
    const cells = [];
    items.forEach((item) => {
      const image = item.querySelector(".aem-feature-collection__illustration img, img, picture");
      const textCell = [];
      const heading = item.querySelector(".aem-feature-collection__text h3, h3, h2, h4");
      if (heading) textCell.push(heading);
      const paragraphs = Array.from(item.querySelectorAll(".rds-typography__paragraph p, p"));
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
    const introHeading = element.querySelector(".horizontal-feature-collection h2, h2");
    const cta = element.querySelector(".usaa-aem-feature-collection__cta--horizontal a, a.rds-button__secondary");
    const nodes = [];
    if (introHeading) nodes.push(introHeading);
    nodes.push(block);
    if (cta) nodes.push(cta);
    element.replaceWith(...nodes);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document: document2 }) {
    let cards = Array.from(element.querySelectorAll(".usaa-aem-card-ac__individualCard, article.rds-card"));
    if (!cards.length) {
      cards = Array.from(element.querySelectorAll(".article-teaser-child, article.aem-article-teaser__teaser"));
    }
    cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector('.rds-card__image img, .article-teaser-child-image img, img:not([src^="data:"])');
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

  // tools/importer/parsers/tabs-perks.js
  function parse6(element, { document: document2 }) {
    var _a;
    const tabButtons = Array.from(element.querySelectorAll(".rds-tabs__list .rds-tabs__tab, .rds-tabs__list button"));
    const panels = Array.from(element.querySelectorAll(".rds-tabs__panel"));
    const cells = [];
    panels.forEach((panel, i) => {
      const button = tabButtons[i];
      const label = (button ? button.textContent : `Tab ${i + 1}`).trim();
      const labelP = document2.createElement("p");
      labelP.textContent = label;
      const contentCell = [];
      const introHeading = panel.querySelector(".usaa-aem-card-pack-ac h2, .rds-layout__container > h2, h2");
      if (introHeading) contentCell.push(introHeading);
      let cards = Array.from(panel.querySelectorAll(".usaa-aem-card-ac__individualCard, article.rds-card"));
      cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));
      cards.forEach((card) => {
        const image = card.querySelector('.usaa-aem-card-ac__icon img, .rds-card__image img, img:not([src^="data:"])');
        if (image) contentCell.push(image);
        const heading = card.querySelector(".rds-card__body h3, h3, h4");
        if (heading) contentCell.push(heading);
        Array.from(card.querySelectorAll(".rds-typography__paragraph p, .rds-card__body p")).filter((p) => p.textContent.trim().length > 0).forEach((p) => contentCell.push(p));
        const ctaSrc = card.querySelector(".usaa-aem-card-ac__action-block a, a.rds-button__tertiary, a[href]");
        if (ctaSrc) {
          const cta = ctaSrc.cloneNode(true);
          cta.querySelectorAll("img, svg, .rds-globals__screen-reader").forEach((n) => n.remove());
          contentCell.push(cta);
        }
      });
      if (contentCell.length) {
        cells.push([labelP, contentCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-perks", cells });
    const sectionHeading = element.querySelector(".aem-enhanced-tab-block > .rds-layout__container > h2, h2");
    const nodes = [];
    if (sectionHeading && !((_a = element.querySelector(".rds-tabs__panel")) == null ? void 0 : _a.contains(sectionHeading))) {
      nodes.push(sectionHeading);
    }
    nodes.push(block);
    element.replaceWith(...nodes);
  }

  // tools/importer/parsers/cards-award.js
  function parse7(element, { document: document2 }) {
    const badges = Array.from(element.querySelectorAll(".aem-affiliate__layout-grid-container"));
    const cells = [];
    badges.forEach((badge) => {
      const image = badge.querySelector(".aem-affiliate-logo img, img");
      const captionCell = [];
      const paragraphs = Array.from(badge.querySelectorAll("p")).filter((p) => p.textContent.trim().length > 0);
      paragraphs.forEach((p) => captionCell.push(p));
      if (image || captionCell.length) {
        cells.push([image || "", captionCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-award", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-app.js
  function parse8(element, { document: document2 }) {
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
      Array.from(textColumn.querySelectorAll(".rds-typography__paragraph-large p, .rds-typography__paragraph-large ul, p, ul")).filter((n) => !n.closest("a")).filter((n) => n.tagName === "UL" || n.textContent.replace(/ /g, "").trim().length > 0).filter((n, i, arr) => !arr.some((o) => o !== n && o.contains(n))).forEach((n) => textCell.push(n));
      Array.from(textColumn.querySelectorAll(".rds-button__group--align-left a[href], a.apple-app-store, a.google-play-store")).filter((a, i, arr) => !arr.some((o) => o !== a && o.contains(a))).forEach((a) => {
        const badge = a.cloneNode(true);
        badge.querySelectorAll(".rds-globals__screen-reader, .text-hide").forEach((n) => n.remove());
        textCell.push(badge);
      });
    }
    if (!textCell.length && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const imageCell = image || "";
    const isImageRight = (spotlight.className || "").includes("image-right") || !!spotlight.querySelector(".aem-feature-spotlight--image-right");
    const row = isImageRight ? [textCell, imageCell] : [imageCell, textCell];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-app", cells: [row] });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-quicklink.js
  function parse9(element, { document: document2 }) {
    let cards = Array.from(element.querySelectorAll(".usaa-aem-card-ac__individualCard, article.rds-card"));
    cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector('.usaa-aem-card-ac__icon img, .rds-card__image img, img:not([src^="data:"])');
      const labelCell = [];
      const heading = card.querySelector(".rds-card__body h3, h3, h4");
      if (heading) labelCell.push(heading);
      const paragraphs = Array.from(card.querySelectorAll(".rds-typography__paragraph p, .rds-card__body p")).filter((p) => p.textContent.trim().length > 0);
      paragraphs.forEach((p) => labelCell.push(p));
      const ctaSrc = card.querySelector(".usaa-aem-card-ac__action-block a, a.rds-button__tertiary, a[href]");
      if (ctaSrc) {
        const cta = ctaSrc.cloneNode(true);
        cta.querySelectorAll("img, svg").forEach((n) => n.remove());
        labelCell.push(cta);
      }
      if (image || labelCell.length) {
        cells.push([image || "", labelCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-quicklink", cells });
    const introHeading = element.querySelector(".usaa-aem-card-pack-ac h2, h2");
    const nodes = [];
    if (introHeading) nodes.push(introHeading);
    nodes.push(block);
    element.replaceWith(...nodes);
  }

  // tools/importer/parsers/columns-links.js
  function parse10(element, { document: document2 }) {
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
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "a.usaa-skipToContent",
        // "Skip to Content" link
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

  // tools/importer/import-home.js
  var PAGE_TEMPLATE = {
    "name": "home",
    "urls": [
      "https://www.usaa.com/"
    ],
    "representativeUrl": "https://www.usaa.com/",
    "description": "USAA home page",
    "blocks": [
      {
        "name": "hero-banner",
        "instances": [
          "#mkt_mainBnr"
        ]
      },
      {
        "name": "cards-product",
        "instances": [
          "#mkt_mainCards"
        ]
      },
      {
        "name": "columns-spotlight",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12"
        ]
      },
      {
        "name": "cards-feature",
        "instances": [
          ".feature-collection-authored-content"
        ]
      },
      {
        "name": "cards-article",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.card-pack-authored-content.aem-GridColumn.aem-GridColumn--default--12",
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.article-teaser.aem-GridColumn.aem-GridColumn--default--12"
        ]
      },
      {
        "name": "tabs-perks",
        "instances": [
          ".usaa-aem-tab-block-enhanced"
        ]
      },
      {
        "name": "cards-award",
        "instances": [
          ".affiliate-block"
        ]
      },
      {
        "name": "columns-app",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12"
        ]
      },
      {
        "name": "cards-quicklink",
        "instances": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.card-pack-authored-content.aem-GridColumn.aem-GridColumn--default--12"
        ]
      },
      {
        "name": "columns-links",
        "instances": [
          ".usaa-aem-wayfinding-block"
        ]
      }
    ],
    "urlPattern": "/",
    "sections": [
      {
        "id": "s1",
        "name": "membership-promo-strip",
        "selector": [
          "#mkt_adBand"
        ],
        "style": "accent",
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "s2",
        "name": "main-banner",
        "selector": [
          "#mkt_mainBnr"
        ],
        "style": null,
        "blocks": [
          "hero-banner"
        ],
        "defaultContent": []
      },
      {
        "id": "s3",
        "name": "banner-product-cards",
        "selector": [
          "#mkt_mainCards"
        ],
        "style": null,
        "blocks": [
          "cards-product"
        ],
        "defaultContent": []
      },
      {
        "id": "s4",
        "name": "medicare-callout",
        "selector": [
          ".callout-block-authored-content"
        ],
        "style": null,
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "s5",
        "name": "century-of-service",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-text-block.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "highlight",
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "s6",
        "name": "who-can-join",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "columns-spotlight"
        ],
        "defaultContent": []
      },
      {
        "id": "s7",
        "name": "membership-benefits",
        "selector": [
          ".feature-collection-authored-content"
        ],
        "style": null,
        "blocks": [
          "cards-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "s8",
        "name": "protection-articles",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.card-pack-authored-content.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "cards-article"
        ],
        "defaultContent": []
      },
      {
        "id": "s9",
        "name": "usaa-perks",
        "selector": [
          ".usaa-aem-tab-block-enhanced"
        ],
        "style": null,
        "blocks": [
          "tabs-perks"
        ],
        "defaultContent": []
      },
      {
        "id": "s10",
        "name": "awards",
        "selector": [
          ".affiliate-block"
        ],
        "style": null,
        "blocks": [
          "cards-award"
        ],
        "defaultContent": []
      },
      {
        "id": "s11",
        "name": "advice-articles",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.article-teaser.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "cards-article"
        ],
        "defaultContent": []
      },
      {
        "id": "s12",
        "name": "mobile-app",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > section.usaa-aem-spotlight.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "dark",
        "blocks": [
          "columns-app"
        ],
        "defaultContent": []
      },
      {
        "id": "s13",
        "name": "how-can-we-help",
        "selector": [
          "#body-wrapper--main > div.root.responsivegrid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.card-pack-authored-content.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "dark",
        "blocks": [
          "cards-quicklink"
        ],
        "defaultContent": []
      },
      {
        "id": "s14",
        "name": "other-products-wayfinding",
        "selector": [
          ".usaa-aem-wayfinding-block"
        ],
        "style": null,
        "blocks": [
          "columns-links"
        ],
        "defaultContent": []
      }
    ]
  };
  var parsers = {
    "hero-banner": parse,
    "cards-product": parse2,
    "columns-spotlight": parse3,
    "cards-feature": parse4,
    "cards-article": parse5,
    "tabs-perks": parse6,
    "cards-award": parse7,
    "columns-app": parse8,
    "cards-quicklink": parse9,
    "columns-links": parse10
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
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
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
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
