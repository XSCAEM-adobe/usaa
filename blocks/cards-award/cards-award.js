import { createOptimizedPicture } from '../../scripts/aem.js';
import { createTag } from '../../scripts/shared.js';

/**
 * Cards Award block — a compact row of award / recognition badges,
 * each with a logo image and a short caption.
 *
 * Expected authored structure: one row per badge. Each cell holds a
 * logo/image and a short caption.
 *
 * @param {Element} block The cards-award block element
 */
export default function decorate(block) {
  const ul = createTag('ul');

  [...block.children].forEach((row) => {
    const li = createTag('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    const wrapper = li.firstElementChild;
    if (wrapper && wrapper.tagName === 'DIV' && li.children.length === 1) {
      while (wrapper.firstChild) li.append(wrapper.firstChild);
      wrapper.remove();
    }

    const picture = li.querySelector('picture');
    if (picture) {
      const imageDiv = createTag('div', { class: 'cards-award-badge' });
      imageDiv.append(picture);
      li.prepend(imageDiv);
    }

    const body = createTag('div', { class: 'cards-award-caption' });
    [...li.children].forEach((child) => {
      if (!child.classList.contains('cards-award-badge')) body.append(child);
    });
    if (body.children.length) li.append(body);

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    if (picture) {
      picture.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '300' }]));
    }
  });

  block.replaceChildren(ul);
}
