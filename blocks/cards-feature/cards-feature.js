import { createOptimizedPicture } from '../../scripts/aem.js';
import { createTag } from '../../scripts/shared.js';

/**
 * Cards Feature block — a grid of feature cards, each with an icon
 * alongside a heading and a short descriptive paragraph.
 *
 * Expected authored structure: one row per feature. Each row has an
 * icon/image cell and a text cell (heading + short text).
 *
 * @param {Element} block The cards-feature block element
 */
export default function decorate(block) {
  const ul = createTag('ul');

  [...block.children].forEach((row) => {
    const li = createTag('li');
    const body = createTag('div', { class: 'cards-feature-body' });

    let picture = null;

    [...row.children].forEach((cell) => {
      const cellPicture = cell.querySelector('picture');
      if (cellPicture && !picture && cell.textContent.trim() === '') {
        // dedicated image cell
        picture = cellPicture;
      } else {
        // flatten the cell's content into the card body (drops empty wrappers)
        while (cell.firstChild) body.append(cell.firstChild);
      }
    });

    if (picture) {
      const iconDiv = createTag('div', { class: 'cards-feature-icon' });
      iconDiv.append(picture);
      li.append(iconDiv);
    } else {
      li.classList.add('cards-feature-no-icon');
    }

    li.append(body);

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    if (picture) {
      picture.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '150' }]));
    }
  });

  block.replaceChildren(ul);
}
