import { createOptimizedPicture } from '../../scripts/aem.js';
import { createTag } from '../../scripts/shared.js';

/**
 * Cards Credit Card block — a list of rich credit-card product tiles. Each tile
 * has card art + product heading + CTAs at the top, then three info columns
 * (Special Offer / Benefits and Features / Rates and Fees), plus an optional
 * trailing disclosure.
 *
 * Expected authored structure: one row per card. The cell holds the card art
 * image, a heading, CTA links, and the info content (h3 sub-headings + text).
 * The block is tolerant of missing pieces.
 *
 * @param {Element} block The cards-creditcard block element
 */
export default function decorate(block) {
  const ul = createTag('ul');

  [...block.children].forEach((row) => {
    const li = createTag('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Flatten a single wrapper div if present.
    const wrapper = li.firstElementChild;
    if (wrapper && wrapper.tagName === 'DIV' && li.children.length === 1) {
      while (wrapper.firstChild) li.append(wrapper.firstChild);
      wrapper.remove();
    }

    const nodes = [...li.children];
    li.replaceChildren();

    // Product heading spans the full width at the top of the card.
    const heading = createTag('div', { class: 'cards-creditcard-heading' });
    // First column of the body grid: card art + CTAs.
    const media = createTag('div', { class: 'cards-creditcard-art' });
    // Body grid: art column + info columns (Special Offer / Benefits / Rates).
    const body = createTag('div', { class: 'cards-creditcard-body' });
    let currentCol = null;
    let inInfo = false;
    const disclosure = [];

    nodes.forEach((node) => {
      const pic = node.tagName === 'PICTURE' ? node : node.querySelector?.('picture');
      const isHeading = /^H[1-4]$/.test(node.tagName);

      if (!inInfo && (node.tagName === 'PICTURE' || (pic && !node.textContent.trim()))) {
        media.append(pic || node);
        return;
      }
      if (!inInfo && isHeading && node.tagName !== 'H3') {
        heading.append(node);
        return;
      }
      if (!inInfo && (node.classList?.contains('button-container') || node.querySelector?.('a'))) {
        // CTA links sit in the art column, under the card image.
        media.append(node);
        return;
      }
      // Info region begins at the first H3 (column heading).
      if (node.tagName === 'H3') {
        inInfo = true;
        currentCol = createTag('div', { class: 'cards-creditcard-column' });
        currentCol.append(node);
        body.append(currentCol);
        return;
      }
      if (inInfo && currentCol) {
        currentCol.append(node);
        return;
      }
      // Anything trailing after info with no column → disclosure.
      disclosure.push(node);
    });

    // The art column is the first cell of the body grid.
    if (media.children.length) body.prepend(media);
    if (heading.children.length) li.append(heading);
    if (body.children.length) li.append(body);
    disclosure.forEach((d) => {
      d.classList.add('cards-creditcard-disclosure');
      li.append(d);
    });

    ul.append(li);
  });

  // CTA hierarchy matching the source: "Apply now" is the solid primary button,
  // "Card details" an outlined (secondary) button, and any further link
  // ("Join USAA") a plain text link.
  ul.querySelectorAll('.cards-creditcard-art').forEach((art) => {
    const ctas = art.querySelectorAll('a.button');
    ctas.forEach((a, i) => {
      if (i === 0) return;
      if (i === 1) {
        a.classList.add('secondary');
        return;
      }
      a.classList.remove('button', 'primary', 'secondary');
      const container = a.closest('.button-container');
      if (container) container.classList.remove('button-container');
    });
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    if (picture) {
      picture.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '400' }]));
    }
  });

  block.replaceChildren(ul);
}
