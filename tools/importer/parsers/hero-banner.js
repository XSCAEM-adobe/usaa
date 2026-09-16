/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero.
 * Source: https://www.usaa.com/ (#mkt_mainBnr)
 * Structure (from library-description.txt): 1 column, 3 rows —
 *   row 1: block name
 *   row 2: background image (optional)
 *   row 3: content cell (title, subheading, CTA)
 */
export default function parse(element, { document }) {
  // Background / main visual: prefer the right-side hero image, fall back to any image.
  const bgImage = element.querySelector('.mkt_mainB_right img, img[src*=".jpg"], img[src*=".jpeg"], picture')
    || element.querySelector('img');

  // Content column (left side).
  const contentRoot = element.querySelector('.mkt_mainB_left') || element;

  const heading = contentRoot.querySelector('h1, h2, .hero-heading, [class*="title"]');
  const subheading = contentRoot.querySelector('h2:not(:first-of-type), h3:not(.rds-globals__screen-reader)');
  const paragraphs = Array.from(contentRoot.querySelectorAll(':scope > p, .mkt_mainB_left > p, p'))
    .filter((p) => p.textContent.trim().length > 0);

  // CTA: the primary button text (no href in source) becomes a link placeholder if a real anchor exists.
  const ctaLinks = Array.from(contentRoot.querySelectorAll('a.button, a.rds-button__primary, a[class*="button"]'));

  if (!heading && paragraphs.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (optional)
  if (bgImage) cells.push([bgImage]);

  // Row 3: content cell (single column – all elements in one cell)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  // Include subsequent headings (subheading) that are not the primary heading.
  const allHeadings = Array.from(contentRoot.querySelectorAll('h1, h2, h3'))
    .filter((h) => !h.classList.contains('rds-globals__screen-reader') && h !== heading);
  allHeadings.forEach((h) => contentCell.push(h));
  paragraphs.forEach((p) => contentCell.push(p));
  ctaLinks.forEach((a) => contentCell.push(a));
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
