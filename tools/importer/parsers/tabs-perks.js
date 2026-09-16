/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-perks. Base: tabs.
 * Source: https://www.usaa.com/ (section.usaa-aem-tab-block-enhanced)
 * Structure (from library-description.txt): 2 columns —
 *   row 1: block name
 *   each tab row: [ tab label cell, panel content cell ]
 * Panels contain card-pack grids. Blocks cannot nest, so each panel's
 * cards are flattened into the content cell (intro heading + per-card
 * image, heading, description and CTA link).
 */
export default function parse(element, { document }) {
  const tabButtons = Array.from(element.querySelectorAll('.rds-tabs__list .rds-tabs__tab, .rds-tabs__list button'));
  const panels = Array.from(element.querySelectorAll('.rds-tabs__panel'));

  const cells = [];

  panels.forEach((panel, i) => {
    // Tab label.
    const button = tabButtons[i];
    const label = (button ? button.textContent : `Tab ${i + 1}`).trim();
    const labelP = document.createElement('p');
    labelP.textContent = label;

    // Panel content cell — flatten card-pack contents.
    const contentCell = [];

    // Optional panel intro heading.
    const introHeading = panel.querySelector('.usaa-aem-card-pack-ac h2, .rds-layout__container > h2, h2');
    if (introHeading) contentCell.push(introHeading);

    let cards = Array.from(panel.querySelectorAll('.usaa-aem-card-ac__individualCard, article.rds-card'));
    cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));

    cards.forEach((card) => {
      const image = card.querySelector('.usaa-aem-card-ac__icon img, .rds-card__image img, img:not([src^="data:"])');
      if (image) contentCell.push(image);

      const heading = card.querySelector('.rds-card__body h3, h3, h4');
      if (heading) contentCell.push(heading);

      Array.from(card.querySelectorAll('.rds-typography__paragraph p, .rds-card__body p'))
        .filter((p) => p.textContent.trim().length > 0)
        .forEach((p) => contentCell.push(p));

      const ctaSrc = card.querySelector('.usaa-aem-card-ac__action-block a, a.rds-button__tertiary, a[href]');
      if (ctaSrc) {
        const cta = ctaSrc.cloneNode(true);
        cta.querySelectorAll('img, svg, .rds-globals__screen-reader').forEach((n) => n.remove());
        contentCell.push(cta);
      }
    });

    if (contentCell.length) {
      cells.push([labelP, contentCell]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-perks', cells });

  // Preserve the section heading before the tabs block.
  const sectionHeading = element.querySelector('.aem-enhanced-tab-block > .rds-layout__container > h2, h2');
  const nodes = [];
  if (sectionHeading && !element.querySelector('.rds-tabs__panel')?.contains(sectionHeading)) {
    nodes.push(sectionHeading);
  }
  nodes.push(block);

  element.replaceWith(...nodes);
}
