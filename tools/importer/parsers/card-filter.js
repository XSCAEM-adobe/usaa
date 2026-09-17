/* eslint-disable */
/* global WebImporter */
/**
 * Parser for card-filter (credit cards category filter). Base: card-filter.
 * Source: USAA credit cards page — the interactive "filter cards" widget.
 *
 * The live filter is a JS app; the scraped DOM does not carry usable chip
 * markup. The category set is fixed and known from the page's product sections,
 * so this parser emits one row per category label. The block's decorate() adds
 * the "All cards" chip and wires up show/hide of the card groups.
 *
 * Emitted block (matches blocks/card-filter/card-filter.js contract):
 *   one row per category: [ label ]
 */
const CATEGORIES = ['Low Rate', 'Cash Back', 'Reward Points', 'Build Credit'];

export default function parse(element, { document }) {
  const cells = CATEGORIES.map((label) => {
    const p = document.createElement('p');
    p.textContent = label;
    return [p];
  });
  const block = WebImporter.Blocks.createBlock(document, { name: 'card-filter', cells });
  element.replaceWith(block);
}
