/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from "./parsers/hero-banner.js";
import cardsFeatureParser from "./parsers/cards-feature.js";
import columnsSpotlightParser from "./parsers/columns-spotlight.js";
import cardsStepsParser from "./parsers/cards-steps.js";
import tableRateParser from "./parsers/table-rate.js";
import faqExpandParser from "./parsers/faq-expand.js";
import cardsArticleParser from "./parsers/cards-article.js";
import heroCalloutParser from "./parsers/hero-callout.js";
import columnsLinksParser from "./parsers/columns-links.js";

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/usaa-cleanup.js';
import sectionsTransformer from './transformers/usaa-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
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

// PARSER REGISTRY
const parsers = {
  "hero-banner": heroBannerParser,
  "cards-feature": cardsFeatureParser,
  "columns-spotlight": columnsSpotlightParser,
  "cards-steps": cardsStepsParser,
  "table-rate": tableRateParser,
  "faq-expand": faqExpandParser,
  "cards-article": cardsArticleParser,
  "hero-callout": heroCalloutParser,
  "columns-links": columnsLinksParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try { transformerFn.call(null, hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let elements = [];
      try { elements = document.querySelectorAll(selector); }
      catch (e) { console.warn(`Invalid selector for ${blockDef.name}: ${selector}`); return; }
      if (elements.length === 0) console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      elements.forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers("beforeTransform", main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (parser) {
        try { parser(block.element, { document, url, params }); }
        catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
      } else { console.warn(`No parser found for block: ${block.name}`); }
    });

    executeTransformers("afterTransform", main, payload);

    const hr = document.createElement("hr");
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
    const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);

    return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
  },
};
