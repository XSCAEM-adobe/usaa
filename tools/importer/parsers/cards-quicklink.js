/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-quicklink. Base: cards.
 * Source: https://www.usaa.com/ (.card-pack-authored-content — "How can we help you?")
 * Structure (from library-description.txt): 2 columns —
 *   row 1: block name
 *   each tile row: [ icon image cell, label cell (heading + CTA link) ]
 */
export default function parse(element, { document }) {
  let cards = Array.from(element.querySelectorAll('.usaa-aem-card-ac__individualCard, article.rds-card'));
  cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));

  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.usaa-aem-card-ac__icon img, .rds-card__image img, img:not([src^="data:"])');

    const labelCell = [];
    const heading = card.querySelector('.rds-card__body h3, h3, h4');
    if (heading) labelCell.push(heading);

    const paragraphs = Array.from(card.querySelectorAll('.rds-typography__paragraph p, .rds-card__body p'))
      .filter((p) => p.textContent.trim().length > 0);
    paragraphs.forEach((p) => labelCell.push(p));

    const ctaSrc = card.querySelector('.usaa-aem-card-ac__action-block a, a.rds-button__tertiary, a[href]');
    if (ctaSrc) {
      const cta = ctaSrc.cloneNode(true);
      cta.querySelectorAll('img, svg').forEach((n) => n.remove());
      labelCell.push(cta);
    }

    if (image || labelCell.length) {
      cells.push([image || '', labelCell]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-quicklink', cells });

  // Preserve the section heading before the block.
  const introHeading = element.querySelector('.usaa-aem-card-pack-ac h2, h2');
  const nodes = [];
  if (introHeading) nodes.push(introHeading);
  nodes.push(block);

  element.replaceWith(...nodes);
}
