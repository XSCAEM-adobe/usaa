/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-spotlight. Base: columns.
 * Source: https://www.usaa.com/ (section.usaa-aem-spotlight — "Who can join USAA")
 * Structure (from library-description.txt): multi-column —
 *   row 1: block name
 *   row 2: two cells — text cell (heading, copy, list, CTAs) and image cell.
 * Column order follows the source's image-right / image-left layout.
 */
export default function parse(element, { document }) {
  const spotlight = element.querySelector('.aem-feature-spotlight') || element;

  const imageColumn = spotlight.querySelector('.aem-feature-spotlight__image-column')
    || element.querySelector('.aem-feature-spotlight__image-column');
  const textColumn = Array.from(spotlight.querySelectorAll('.rds-layout__grid-column-md-6'))
    .find((col) => col !== imageColumn && col.textContent.trim().length > 0);

  // Pick a single responsive image (prefer 16x9) to avoid duplicate variants.
  let image = null;
  if (imageColumn) {
    image = imageColumn.querySelector('.aem-feature-spotlight__image-16x9')
      || imageColumn.querySelector('img:not([src^="data:"])');
  }

  // Build the text cell: heading, paragraphs, lists, and CTA links (icons stripped).
  const textCell = [];
  if (textColumn) {
    const heading = textColumn.querySelector('h1, h2, h3');
    if (heading) textCell.push(heading);

    Array.from(textColumn.querySelectorAll('.rds-typography__paragraph-large p, .rds-typography__paragraph-large ul, p, ul'))
      .filter((n) => !n.closest('a'))
      // drop empty / non-breaking-space-only paragraphs, keep any list
      .filter((n) => n.tagName === 'UL' || n.textContent.replace(/ /g, '').trim().length > 0)
      // avoid duplicates when both wrapper and inner selected
      .filter((n, i, arr) => !arr.some((o) => o !== n && o.contains(n)))
      .forEach((n) => textCell.push(n));

    Array.from(textColumn.querySelectorAll('a[href]')).forEach((a) => {
      const cta = a.cloneNode(true);
      cta.querySelectorAll('img, svg').forEach((n) => n.remove());
      textCell.push(cta);
    });
  }

  if (!textCell.length && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const imageCell = image || '';

  // Respect visual order: image-right → text then image; otherwise image then text.
  const isImageRight = !!spotlight.querySelector('.aem-feature-spotlight--image-right')
    || !!element.querySelector('.aem-feature-spotlight--image-right')
    || (spotlight.className || '').includes('image-right');

  const row = isImageRight ? [textCell, imageCell] : [imageCell, textCell];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-spotlight', cells: [row] });
  element.replaceWith(block);
}
