/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-award. Base: cards.
 * Source: https://www.usaa.com/ (.affiliate-block)
 * Structure (from library-description.txt): 2 columns —
 *   row 1: block name
 *   each badge row: [ logo image cell, caption cell (title, description) ]
 */
export default function parse(element, { document }) {
  const badges = Array.from(element.querySelectorAll('.aem-affiliate__layout-grid-container'));

  const cells = [];

  badges.forEach((badge) => {
    const image = badge.querySelector('.aem-affiliate-logo img, img');

    const captionCell = [];
    // Caption paragraphs live in the div sibling to the logo.
    const paragraphs = Array.from(badge.querySelectorAll('p'))
      .filter((p) => p.textContent.trim().length > 0);
    paragraphs.forEach((p) => captionCell.push(p));

    if (image || captionCell.length) {
      cells.push([image || '', captionCell]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-award', cells });
  element.replaceWith(block);
}
