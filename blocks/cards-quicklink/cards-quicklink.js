import { createOptimizedPicture } from '../../scripts/aem.js';
import { createTag } from '../../scripts/shared.js';

/**
 * Cards Quicklink block — a grid of compact quick-action tiles, each with an
 * icon and a label link. Sits on a dark navy section; tiles are light cream
 * cards with a red accent bar, dark title and a blue "action" text link.
 *
 * Expected authored structure: one row per tile. Each row has an image/icon
 * cell and a text cell (heading + link).
 *
 * @param {Element} block The cards-quicklink block element
 */
export default function decorate(block) {
  const ul = createTag('ul');

  [...block.children].forEach((row) => {
    const li = createTag('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Pull the icon into its own dedicated element.
    const picture = li.querySelector('picture');
    const iconDiv = createTag('div', { class: 'cards-quicklink-icon' });
    if (picture) iconDiv.append(picture);

    // Everything else becomes the label body. Flatten single-child wrapper
    // divs and drop empty leftover cells so the markup stays clean.
    const body = createTag('div', { class: 'cards-quicklink-label' });
    [...li.children].forEach((child) => {
      if (child.classList.contains('cards-quicklink-icon')) return;
      if (child.tagName === 'DIV') {
        if (!child.textContent.trim() && !child.querySelector('img, picture, a')) {
          child.remove();
          return;
        }
        while (child.firstChild) body.append(child.firstChild);
        child.remove();
      } else {
        body.append(child);
      }
    });

    li.replaceChildren();
    if (picture) li.append(iconDiv);
    if (body.children.length) li.append(body);

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    if (picture) {
      picture.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '200' }]));
    }
  });

  block.replaceChildren(ul);
}
