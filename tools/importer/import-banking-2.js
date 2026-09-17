/* eslint-disable */
/* global WebImporter */

import ccHeroParser from "./parsers/cc-hero.js";
import cardFilterParser from "./parsers/card-filter.js";
import cardsCreditcardParser from "./parsers/cards-creditcard.js";
import cardsFeatureParser from "./parsers/cards-feature.js";
import cardsArticleParser from "./parsers/cards-article.js";
import faqExpandParser from "./parsers/faq-expand.js";
import cleanupTransformer from "./transformers/usaa-cleanup.js";
import sectionsTransformer from "./transformers/usaa-sections.js";

const PAGE_TEMPLATE = {
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

const parsers = {
  "cc-hero": ccHeroParser,
  "card-filter": cardFilterParser,
  "cards-creditcard": cardsCreditcardParser,
  "cards-feature": cardsFeatureParser,
  "cards-article": cardsArticleParser,
  "faq-expand": faqExpandParser,
};

const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => { try { fn.call(null, hookName, element, enhancedPayload); } catch (e) { console.error(hookName, e); } });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let els = [];
      try { els = document.querySelectorAll(selector); } catch (e) { return; }
      els.forEach((element) => pageBlocks.push({ name: blockDef.name, selector, element }));
    });
  });
  console.log("Found " + pageBlocks.length + " block instances on page");
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
      if (parser) { try { parser(block.element, { document, url, params }); } catch (e) { console.error(block.name, e); } }
      else console.warn("No parser for " + block.name);
    });
    executeTransformers("afterTransform", main, payload);
    const hr = document.createElement("hr"); main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
    const rawPath = new URL(params.originalURL).pathname.replace(/[/]$/, "").replace(/[.]html?$/, "");
    const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
    return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
  },
};
