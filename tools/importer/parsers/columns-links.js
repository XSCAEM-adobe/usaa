/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-links. Base: columns.
 * Source: https://www.usaa.com/ (section.usaa-aem-wayfinding-block)
 * Structure (from library-description.txt): multi-column —
 *   row 1: block name
 *   row 2: one cell per column; each cell holds a heading, a link list
 *          and an optional "view all" CTA.
 * The section heading is preserved as default content before the block.
 */
export default function parse(element, { document }) {
  const columns = Array.from(element.querySelectorAll('.rds-layout__grid-row.levelOne > div, .wayfinding-select-display > div'))
    .filter((c) => c.querySelector('h3, ul'));

  const row = [];

  columns.forEach((col) => {
    const cell = [];
    const heading = col.querySelector('h3, h4');
    if (heading) cell.push(heading);

    const list = col.querySelector('ul');
    if (list) cell.push(list);

    const ctaSrc = col.querySelector('.usaa-aem-wayfinding-block-child__action-block a, a.rds-button__tertiary, a[href]:not(.rds-typography__text-link)');
    if (ctaSrc) {
      const cta = ctaSrc.cloneNode(true);
      cta.querySelectorAll('img, svg').forEach((n) => n.remove());
      cell.push(cta);
    }

    if (cell.length) row.push(cell);
  });

  if (!row.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-links', cells: [row] });

  // Preserve the section heading before the block.
  const sectionHeading = element.querySelector(':scope h2, h2');
  const nodes = [];
  if (sectionHeading) nodes.push(sectionHeading);
  nodes.push(block);

  element.replaceWith(...nodes);
}
