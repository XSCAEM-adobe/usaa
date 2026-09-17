import { createTag } from '../../scripts/shared.js';

/**
 * Cards Steps block — a row of numbered process steps, each rendered as a
 * circular number badge, a heading and body text.
 *
 * Expected authored structure: one row per step. Each cell holds a heading
 * and body copy (and may contain inline links). Steps are numbered
 * automatically in document order.
 *
 * @param {Element} block The cards-steps block element
 */
export default function decorate(block) {
  const ol = createTag('ol');

  [...block.children].forEach((row, i) => {
    const li = createTag('li');

    // Flatten a single wrapper div if present.
    while (row.firstElementChild) li.append(row.firstElementChild);
    const wrapper = li.firstElementChild;
    if (wrapper && wrapper.tagName === 'DIV' && li.children.length === 1) {
      while (wrapper.firstChild) li.append(wrapper.firstChild);
      wrapper.remove();
    }

    // Auto-numbered badge.
    const badge = createTag('span', { class: 'cards-steps-badge', 'aria-hidden': 'true' }, String(i + 1));
    li.prepend(badge);

    // Wrap the remaining content as the step body.
    const body = createTag('div', { class: 'cards-steps-body' });
    [...li.children].forEach((child) => {
      if (!child.classList.contains('cards-steps-badge')) body.append(child);
    });
    li.append(body);

    ol.append(li);
  });

  block.replaceChildren(ol);
}
