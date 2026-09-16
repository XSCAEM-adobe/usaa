/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from "./parsers/hero-banner.js";
import cardsProductParser from "./parsers/cards-product.js";
import columnsSpotlightParser from "./parsers/columns-spotlight.js";
import cardsFeatureParser from "./parsers/cards-feature.js";
import cardsArticleParser from "./parsers/cards-article.js";
import tabsPerksParser from "./parsers/tabs-perks.js";
import cardsAwardParser from "./parsers/cards-award.js";
import columnsAppParser from "./parsers/columns-app.js";
import cardsQuicklinkParser from "./parsers/cards-quicklink.js";
import columnsLinksParser from "./parsers/columns-links.js";

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/usaa-cleanup.js';
import sectionsTransformer from './transformers/usaa-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
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

// PARSER REGISTRY
const parsers = {
  "hero-banner": heroBannerParser,
  "cards-product": cardsProductParser,
  "columns-spotlight": columnsSpotlightParser,
  "cards-feature": cardsFeatureParser,
  "cards-article": cardsArticleParser,
  "tabs-perks": tabsPerksParser,
  "cards-award": cardsAwardParser,
  "columns-app": columnsAppParser,
  "cards-quicklink": cardsQuicklinkParser,
  "columns-links": columnsLinksParser,
};

// TRANSFORMER REGISTRY - cleanup runs first, section breaks/metadata after
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook.
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration.
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let elements = [];
      try {
        elements = document.querySelectorAll(selector);
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

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. beforeTransform cleanup
    executeTransformers("beforeTransform", main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block (skip ones already replaced by an earlier parser)
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform cleanup + section breaks/metadata
    executeTransformers("afterTransform", main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement("hr");
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (root URL maps to /index)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, "")
      .replace(/\.html?$/, "");
    const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
