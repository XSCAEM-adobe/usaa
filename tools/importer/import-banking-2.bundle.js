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

  // tools/importer/import-banking-2.js
  var import_banking_2_exports = {};
  __export(import_banking_2_exports, {
    default: () => import_banking_2_default
  });

  // tools/importer/parsers/cc-hero.js
  var HERO_IMAGE = "https://static.usaa.com/content/dam/digital/images/cc-hero-cashback_lifestyle.jpg";
  function parse(element, { document: document2 }) {
    const eyebrow = element.querySelector("h1");
    const heading = element.querySelector("h2");
    const paragraphs = [...element.querySelectorAll("p")].filter((p) => p.textContent.trim());
    const ctas = [...element.querySelectorAll("a[href]")].filter((a) => a.textContent.trim());
    const img = document2.createElement("img");
    img.src = HERO_IMAGE;
    img.alt = "";
    const content = [];
    if (eyebrow) content.push(eyebrow);
    if (heading) content.push(heading);
    const body = paragraphs.find((p) => p.textContent.trim().length > 20);
    if (body) content.push(body);
    ctas.forEach((a) => {
      const p = document2.createElement("p");
      p.append(a.cloneNode(true));
      content.push(p);
    });
    const cells = [[img], [content]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "cc-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/card-filter.js
  var CATEGORIES = ["Low Rate", "Cash Back", "Reward Points", "Build Credit"];
  function parse2(element, { document: document2 }) {
    const cells = CATEGORIES.map((label) => {
      const p = document2.createElement("p");
      p.textContent = label;
      return [p];
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "card-filter", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-creditcard.js
  function parse3(element, { document: document2 }) {
    const tiles = element.querySelectorAll(".product-tile");
    const cells = [];
    tiles.forEach((tile) => {
      const heading = tile.querySelector("h2.product-tile-title, h2");
      const img = tile.querySelector("img.product-tile-image, img");
      const btnGroup = tile.querySelector(".rds-button__group");
      const ctas = btnGroup ? [...btnGroup.querySelectorAll("a[href]")] : [];
      const infoNodes = [];
      const seenSections = /* @__PURE__ */ new Set();
      tile.querySelectorAll("h3.product-tile-column-heading").forEach((h3) => {
        const key = h3.textContent.trim();
        if (!key || seenSections.has(key)) return;
        seenSections.add(key);
        infoNodes.push(h3);
        const content = h3.nextElementSibling;
        if (content) infoNodes.push(content);
      });
      const disclosure = [...tile.querySelectorAll("div.rds-layout--bottom-6")].find((d) => d.textContent.trim().startsWith("Important information"));
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (img) contentCell.push(img);
      ctas.forEach((a) => contentCell.push(a));
      infoNodes.forEach((n) => contentCell.push(n));
      if (disclosure) contentCell.push(disclosure);
      if (heading || img) {
        cells.push([contentCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-creditcard", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse4(element, { document: document2 }) {
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

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document: document2 }) {
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

  // tools/importer/import-banking-2.js
  var PAGE_TEMPLATE = {
    "name": "banking-2",
    "urls": [
      "https://www.usaa.com/banking/credit-cards-public?wa_ref=pub_home_banner_bank_credit_card"
    ],
    "representativeUrl": "https://www.usaa.com/banking/credit-cards-public?wa_ref=pub_home_banner_bank_credit_card",
    "description": "USAA credit cards product page",
    "blocks": [
      {
        "name": "cc-hero",
        "instances": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-globals__background-inverse.banner-class"
        ]
      },
      {
        "name": "card-filter",
        "instances": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(2)"
        ]
      },
      {
        "name": "cards-creditcard",
        "instances": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(4)",
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(6)",
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(8)",
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(10)"
        ]
      },
      {
        "name": "cards-feature",
        "instances": [
          ".pd-gtb-background",
          ".rds-layout--top-1.rds-layout--bottom-6"
        ]
      },
      {
        "name": "cards-article",
        "instances": [
          ".articles-list-container"
        ]
      },
      {
        "name": "faq-expand",
        "instances": [
          ".faq-container"
        ]
      }
    ],
    "urlPattern": "/banking/*",
    "sections": [
      {
        "id": "1",
        "name": "hero",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-globals__background-inverse.banner-class"
        ],
        "style": null,
        "blocks": [
          "cc-hero"
        ],
        "defaultContent": []
      },
      {
        "id": "2",
        "name": "filter-bar",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(2)"
        ],
        "style": null,
        "blocks": [
          "card-filter"
        ],
        "defaultContent": []
      },
      {
        "id": "3",
        "name": "lowrate-header",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.section-header-container:nth-of-type(3)"
        ],
        "style": null,
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "4",
        "name": "lowrate-products",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(4)"
        ],
        "style": null,
        "blocks": [
          "cards-creditcard"
        ],
        "defaultContent": []
      },
      {
        "id": "5",
        "name": "cashback-header",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.section-header-container:nth-of-type(5)"
        ],
        "style": null,
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "6",
        "name": "cashback-products",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(6)"
        ],
        "style": null,
        "blocks": [
          "cards-creditcard"
        ],
        "defaultContent": []
      },
      {
        "id": "7",
        "name": "rewardpoints-header",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.section-header-container:nth-of-type(7)"
        ],
        "style": null,
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "8",
        "name": "rewardpoints-products",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(8)"
        ],
        "style": null,
        "blocks": [
          "cards-creditcard"
        ],
        "defaultContent": []
      },
      {
        "id": "9",
        "name": "buildcredit-header",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.section-header-container:nth-of-type(9)"
        ],
        "style": null,
        "blocks": [],
        "defaultContent": []
      },
      {
        "id": "10",
        "name": "buildcredit-products",
        "selector": [
          "#usaa-templateContent > div > div.storefront-cc-main > div.sf-cc-main > div.rds-layout__container:nth-of-type(10)"
        ],
        "style": null,
        "blocks": [
          "cards-creditcard"
        ],
        "defaultContent": []
      },
      {
        "id": "11",
        "name": "explore-benefits",
        "selector": [
          ".pd-gtb-background",
          ".rds-layout--top-1.rds-layout--bottom-6"
        ],
        "style": "grey",
        "blocks": [
          "cards-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "12",
        "name": "related-articles",
        "selector": [
          ".articles-list-container"
        ],
        "style": null,
        "blocks": [
          "cards-article"
        ],
        "defaultContent": []
      },
      {
        "id": "13",
        "name": "faq",
        "selector": [
          ".faq-container"
        ],
        "style": null,
        "blocks": [
          "faq-expand"
        ],
        "defaultContent": []
      }
    ]
  };
  var parsers = {
    "cc-hero": parse,
    "card-filter": parse2,
    "cards-creditcard": parse3,
    "cards-feature": parse4,
    "cards-article": parse5,
    "faq-expand": parse6
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(hookName, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        let els = [];
        try {
          els = document2.querySelectorAll(selector);
        } catch (e) {
          return;
        }
        els.forEach((element) => pageBlocks.push({ name: blockDef.name, selector, element }));
      });
    });
    console.log("Found " + pageBlocks.length + " block instances on page");
    return pageBlocks;
  }
  var import_banking_2_default = {
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
            console.error(block.name, e);
          }
        } else console.warn("No parser for " + block.name);
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/[/]$/, "").replace(/[.]html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{ element: main, path, report: { title: document2.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
    }
  };
  return __toCommonJS(import_banking_2_exports);
})();
