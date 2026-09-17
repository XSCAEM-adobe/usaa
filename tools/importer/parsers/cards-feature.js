/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature. Base: cards.
 * Source: https://www.usaa.com/ (.feature-collection-authored-content)
 * Structure (from library-description.txt): 2 columns —
 *   row 1: block name
 *   each card row: [ image/icon cell, text cell (heading, description) ]
 * The section intro heading and the trailing CTA are preserved as default
 * content around the block (they are not cards).
 */
export default function parse(element, { document }) {
  // Primary (AEM markup): .usaa-aem-feature-item cards.
  let items = Array.from(element.querySelectorAll('.usaa-aem-feature-item'));

  // Fallback (storefront markup, e.g. credit-cards page): .pd-gtb-benefit cells.
  if (!items.length) {
    items = Array.from(element.querySelectorAll('.pd-gtb-benefit'));
  }

  const cells = [];

  items.forEach((item) => {
    const image = item.querySelector('.aem-feature-collection__illustration img, .pd-gtb-icon, img, picture');

    const textCell = [];
    const heading = item.querySelector('.aem-feature-collection__text h3, .pd-gtb-benefit-text h3, h3, h2, h4');
    if (heading) textCell.push(heading);

    const paragraphs = Array.from(item.querySelectorAll('.rds-typography__paragraph p, .pd-gtb-benefit-text p, p'));
    paragraphs.forEach((p) => textCell.push(p));

    if (image || textCell.length) {
      cells.push([image || '', textCell]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });

  // Preserve the section intro heading (before) and CTA (after) as default content.
  const introHeading = element.querySelector('.horizontal-feature-collection h2, .pd-gtb-heading, h2');
  const cta = element.querySelector('.usaa-aem-feature-collection__cta--horizontal a, a.rds-button__secondary');

  const nodes = [];
  if (introHeading) nodes.push(introHeading);
  nodes.push(block);
  if (cta) nodes.push(cta);

  element.replaceWith(...nodes);
}
