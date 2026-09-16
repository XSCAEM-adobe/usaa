/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://www.usaa.com/
 *   instance A: .card-pack-authored-content (article.rds-card cards)
 *   instance B: .article-teaser            (article.aem-article-teaser__teaser cards)
 * Structure (from library-description.txt): 2 columns —
 *   row 1: block name
 *   each card row: [ image cell, text cell (heading, description, CTA) ]
 * The section intro heading + lead paragraph are preserved as default
 * content before the block (they are not cards).
 */
export default function parse(element, { document }) {
  // Support both card-pack and article-teaser markup.
  let cards = Array.from(element.querySelectorAll('.usaa-aem-card-ac__individualCard, article.rds-card'));
  if (!cards.length) {
    cards = Array.from(element.querySelectorAll('.article-teaser-child, article.aem-article-teaser__teaser'));
  }
  // De-duplicate nested matches (keep outermost).
  cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));

  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.rds-card__image img, .article-teaser-child-image img, img:not([src^="data:"])');

    const textCell = [];
    const heading = card.querySelector('.rds-card__body h3, .aem-article-teaser-child-header h3, h3, h4');
    if (heading) textCell.push(heading);

    const paragraphs = Array.from(card.querySelectorAll('.rds-card__body p, p'));
    paragraphs.forEach((p) => textCell.push(p));

    // CTA link — clone and drop any inline icon image (e.g. base64 svg arrow).
    const ctaSrc = card.querySelector('.usaa-aem-card-ac__action-block a, a.rds-button__secondary, a.rds-button__tertiary, a[href]');
    if (ctaSrc) {
      const cta = ctaSrc.cloneNode(true);
      cta.querySelectorAll('img, svg').forEach((n) => n.remove());
      textCell.push(cta);
    }

    if (image || textCell.length) {
      cells.push([image || '', textCell]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });

  // Preserve section intro heading + lead paragraph before the block.
  const introHeading = element.querySelector('.usaa-aem-card-pack-ac h2, .usaa-article-teaser-container h2, h2');
  const introPara = element.querySelector('.usaa-article-teaser-container > p, .rds-typography__paragraph-large p, .rds-typography__paragraph-large');

  const nodes = [];
  if (introHeading) nodes.push(introHeading);
  if (introPara && introPara !== introHeading) nodes.push(introPara);
  nodes.push(block);

  element.replaceWith(...nodes);
}
