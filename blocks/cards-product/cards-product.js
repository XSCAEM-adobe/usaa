import { createOptimizedPicture } from '../../scripts/aem.js';
import { createTag } from '../../scripts/shared.js';

/**
 * Cards Product block — a row of product tiles, each with an icon,
 * a heading and a call-to-action link.
 *
 * Expected authored structure: one row per card. Each card cell holds
 * an icon/image, a heading and a link.
 *
 * @param {Element} block The cards-product block element
 */
export default function decorate(block) {
  const ul = createTag('ul');

  [...block.children].forEach((row) => {
    const li = createTag('li');
    // Lift each cell's contents into the li, discarding the empty cell wrappers.
    [...row.children].forEach((cell) => {
      while (cell.firstChild) li.append(cell.firstChild);
    });

    // Pull the icon/image into its own wrapper.
    const picture = li.querySelector('picture');
    if (picture) {
      const imageDiv = createTag('div', { class: 'cards-product-icon' });
      imageDiv.append(picture);
      li.prepend(imageDiv);
    } else {
      li.classList.add('cards-product-no-icon');
    }

    // Remaining content is the card body.
    const body = createTag('div', { class: 'cards-product-body' });
    [...li.children].forEach((child) => {
      if (!child.classList.contains('cards-product-icon')) body.append(child);
    });
    li.append(body);

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    if (picture) {
      picture.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '400' }]));
    }
  });

  block.replaceChildren(ul);
}
