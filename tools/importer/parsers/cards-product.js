/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-product. Base: cards.
 * Source: https://www.usaa.com/ (#mkt_mainCards)
 * Structure (from library-description.txt): 2 columns —
 *   row 1: block name
 *   each card row: [ image cell, text cell (heading, description, CTA) ]
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.mkt_acqCard'));

  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.acqC_img img, img, picture');

    const textCell = [];
    const heading = card.querySelector('.acqC_copy h2, .acqC_copy h3, h2, h3');
    if (heading) textCell.push(heading);

    const desc = card.querySelector('.acqCC_copy p, .acqCardContent p, p');
    if (desc) textCell.push(desc);

    const cta = card.querySelector('.acqCC_btn a, a.button, a[href]');
    if (cta) textCell.push(cta);

    // Only emit a row if there is meaningful content.
    if (image || textCell.length) {
      cells.push([image || '', textCell]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
