/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-creditcard.
 * Base block: cards. Model: standalone (Document Authoring, custom cards block).
 * Source: USAA credit cards page (banking-2 template).
 *
 * Each credit-card product tile (.product-tile) becomes ONE row in the block table.
 * A section container may hold one OR several tiles (1, 3, 1, 2 across the four
 * product sections); the parser is invoked per matched section element, so it emits
 * one row per tile found within that element.
 *
 * COLUMN STRUCTURE — 1 column per row (single cell). The generic library "cards"
 * convention offers a 2-column (image | text) layout, but this block's own
 * decorate() (blocks/cards-creditcard/cards-creditcard.js) reads only the FIRST
 * cell of each row (`row.firstElementChild`) and then locates the <picture> WITHIN
 * that cell to lift it into a media wrapper. A 2-column layout would drop the second
 * cell, so the correct authored contract for this custom block is a single cell that
 * holds everything: card art image, product heading, the three CTAs (Apply now /
 * Card details / Join USAA — hrefs preserved), the three info sections (Special
 * Offer / Benefits and Features / Rates and Fees, each a sub-heading + content), and
 * a trailing disclosure.
 *
 * NOTE: the source DOM duplicates content across responsive-visibility wrappers
 * (.rds-layout__hidden--visible-*), so the card art, CTAs, and "Special Offer" each
 * appear multiple times per tile. This parser deliberately takes only the FIRST
 * occurrence of each piece and dedupes info sections by heading text to avoid
 * emitting duplicates. Media stays local (source img src is a relative ./images path).
 */
export default function parse(element, { document }) {
  const tiles = element.querySelectorAll('.product-tile');
  const cells = [];

  tiles.forEach((tile) => {
    // Product heading (card name).
    const heading = tile.querySelector('h2.product-tile-title, h2');

    // Card art — first occurrence only (duplicated across breakpoints). Local src.
    const img = tile.querySelector('img.product-tile-image, img');

    // CTAs — first button group only. Preserve hrefs (Apply now / Card details / Join USAA).
    const btnGroup = tile.querySelector('.rds-button__group');
    const ctas = btnGroup ? [...btnGroup.querySelectorAll('a[href]')] : [];

    // Info sections: Special Offer / Benefits and Features / Rates and Fees.
    // Each is an h3.product-tile-column-heading followed by a sibling content div.
    // Dedupe by heading text (Special Offer is duplicated 3x per tile across breakpoints).
    const infoNodes = [];
    const seenSections = new Set();
    tile.querySelectorAll('h3.product-tile-column-heading').forEach((h3) => {
      const key = h3.textContent.trim();
      if (!key || seenSections.has(key)) return;
      seenSections.add(key);
      infoNodes.push(h3);
      const content = h3.nextElementSibling;
      if (content) infoNodes.push(content);
    });

    // Trailing important-disclosure paragraph (present on some tiles only).
    const disclosure = [...tile.querySelectorAll('div.rds-layout--bottom-6')]
      .find((d) => d.textContent.trim().startsWith('Important information'));

    // Assemble the single content cell for this tile/row.
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (img) contentCell.push(img);
    ctas.forEach((a) => contentCell.push(a));
    infoNodes.forEach((n) => contentCell.push(n));
    if (disclosure) contentCell.push(disclosure);

    // Emit a row only if the tile yielded meaningful content.
    if (heading || img) {
      cells.push([contentCell]); // 1-column row: one cell holding all tile content
    }
  });

  // Empty-block guard: nothing extracted → leave content in place.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-creditcard', cells });
  element.replaceWith(block);
}
