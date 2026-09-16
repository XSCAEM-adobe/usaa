/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-app. Base: columns.
 * Source: https://www.usaa.com/ (section.usaa-aem-spotlight — "manage your accounts with our mobile app")
 * Structure (from library-description.txt): multi-column —
 *   row 1: block name
 *   row 2: two cells — image cell (phone screenshot) and text cell
 *          (heading, copy/list, app-store badge links).
 */
export default function parse(element, { document }) {
  const spotlight = element.querySelector('.aem-feature-spotlight') || element;

  const imageColumn = spotlight.querySelector('.aem-feature-spotlight__image-column')
    || element.querySelector('.aem-feature-spotlight__image-column');
  const textColumn = Array.from(spotlight.querySelectorAll('.rds-layout__grid-column-md-6'))
    .find((col) => col !== imageColumn && col.textContent.trim().length > 0);

  // Single responsive image (prefer 16x9).
  let image = null;
  if (imageColumn) {
    image = imageColumn.querySelector('.aem-feature-spotlight__image-16x9')
      || imageColumn.querySelector('img:not([src^="data:"])');
  }

  const textCell = [];
  if (textColumn) {
    const heading = textColumn.querySelector('h1, h2, h3');
    if (heading) textCell.push(heading);

    Array.from(textColumn.querySelectorAll('.rds-typography__paragraph-large p, .rds-typography__paragraph-large ul, p, ul'))
      .filter((n) => !n.closest('a'))
      .filter((n) => n.tagName === 'UL' || n.textContent.replace(/ /g, '').trim().length > 0)
      .filter((n, i, arr) => !arr.some((o) => o !== n && o.contains(n)))
      .forEach((n) => textCell.push(n));

    // App-store badge links: keep the anchor with its badge image.
    Array.from(textColumn.querySelectorAll('.rds-button__group--align-left a[href], a.apple-app-store, a.google-play-store'))
      .filter((a, i, arr) => !arr.some((o) => o !== a && o.contains(a)))
      .forEach((a) => {
        const badge = a.cloneNode(true);
        // Drop screen-reader / text-hide helper spans/divs.
        badge.querySelectorAll('.rds-globals__screen-reader, .text-hide').forEach((n) => n.remove());
        textCell.push(badge);
      });
  }

  if (!textCell.length && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const imageCell = image || '';
  const isImageRight = (spotlight.className || '').includes('image-right')
    || !!spotlight.querySelector('.aem-feature-spotlight--image-right');

  const row = isImageRight ? [textCell, imageCell] : [imageCell, textCell];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-app', cells: [row] });
  element.replaceWith(block);
}
