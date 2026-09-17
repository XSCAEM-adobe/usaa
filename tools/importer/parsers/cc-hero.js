/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cc-hero (credit cards storefront hero). Base: hero.
 * Source: USAA credit cards page — the inverse-background banner ("Credit Cards
 * / Earn 1.5% cash back.").
 *
 * The lifestyle background photo is applied by JavaScript as a CSS background,
 * so it is NOT present as an <img> in the scraped DOM. Its source URL is known
 * and stable, so this parser injects an <img> pointing at that source URL; the
 * post-import image-localization step rewrites it to the local /media-da path
 * (the same as every other image on the page).
 *
 * Emitted block (matches blocks/cc-hero/cc-hero.js contract):
 *   row 1: [ background image ]
 *   row 2: [ eyebrow (h1), headline (h2), body (p), CTAs ]
 */
const HERO_IMAGE = 'https://static.usaa.com/content/dam/digital/images/cc-hero-cashback_lifestyle.jpg';

export default function parse(element, { document }) {
  const eyebrow = element.querySelector('h1');
  const heading = element.querySelector('h2');
  const paragraphs = [...element.querySelectorAll('p')].filter((p) => p.textContent.trim());
  const ctas = [...element.querySelectorAll('a[href]')].filter((a) => a.textContent.trim());

  const img = document.createElement('img');
  img.src = HERO_IMAGE;
  img.alt = '';

  const content = [];
  if (eyebrow) content.push(eyebrow);
  if (heading) content.push(heading);
  // Keep the first supporting paragraph (bonus copy); skip footnote-only nodes.
  const body = paragraphs.find((p) => p.textContent.trim().length > 20);
  if (body) content.push(body);
  ctas.forEach((a) => {
    const p = document.createElement('p');
    p.append(a.cloneNode(true));
    content.push(p);
  });

  // Row 1: background image (one cell). Row 2: all content in a SINGLE cell so
  // the block's decorate() keeps eyebrow/headline/body/CTAs in one content div.
  const cells = [[img], [content]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'cc-hero', cells });
  element.replaceWith(block);
}
