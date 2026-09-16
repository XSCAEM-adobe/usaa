import { createOptimizedPicture } from '../../scripts/aem.js';
import { createTag } from '../../scripts/shared.js';

/**
 * Cards Article block — a grid of article teaser cards, each with a
 * top image, a heading, an optional description and a call-to-action link.
 *
 * Expected authored structure: one row per article card. Each cell holds
 * an image, a heading, optional description text and a link.
 *
 * @param {Element} block The cards-article block element
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
      const imageDiv = createTag('div', { class: 'cards-article-image' });
      const pictureParent = picture.parentElement;
      imageDiv.append(picture);
      li.prepend(imageDiv);
      if (pictureParent && pictureParent.tagName === 'A' && !pictureParent.children.length) {
        pictureParent.remove();
      }
    } else {
      li.classList.add('cards-article-text-only');
    }

    const body = createTag('div', { class: 'cards-article-body' });
    [...li.children].forEach((child) => {
      if (child.classList.contains('cards-article-image')) return;
      // Skip cells emptied when their image was hoisted into cards-article-image
      if (child.tagName === 'DIV' && child.children.length === 0 && !child.textContent.trim()) {
        child.remove();
        return;
      }
      body.append(child);
    });
    li.append(body);

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    if (picture) {
      picture.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]));
    }
  });

  block.replaceChildren(ul);
}
