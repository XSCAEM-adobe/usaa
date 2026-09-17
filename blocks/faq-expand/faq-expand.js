import { createTag } from '../../scripts/shared.js';

/**
 * FAQ Expand block — an accordion of authored Q&A pairs with an "Expand all"
 * toggle. Each authored row is one item: first cell = question, second cell =
 * answer (may contain rich content such as lists).
 *
 * @param {Element} block The faq-expand block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  const list = createTag('div', { class: 'faq-expand-list' });
  const buttons = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const questionCell = cells[0];
    const answerCell = cells[1] || createTag('div');

    const question = (questionCell?.textContent || '').trim();
    if (!question) return;

    const item = createTag('div', { class: 'faq-expand-item' });
    const button = createTag('button', {
      class: 'faq-expand-question',
      type: 'button',
      'aria-expanded': 'false',
    }, question);

    const panel = createTag('div', { class: 'faq-expand-answer', role: 'region', hidden: true });
    while (answerCell.firstChild) panel.append(answerCell.firstChild);

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });

    buttons.push(button);
    item.append(button, panel);
    list.append(item);
  });

  // "Expand all" / "Collapse all" toggle
  const toggleAll = createTag('button', { class: 'faq-expand-toggle-all', type: 'button' }, 'Expand all');
  toggleAll.addEventListener('click', () => {
    const anyCollapsed = buttons.some((b) => b.getAttribute('aria-expanded') !== 'true');
    buttons.forEach((b) => {
      b.setAttribute('aria-expanded', String(anyCollapsed));
      b.nextElementSibling.hidden = !anyCollapsed;
    });
    toggleAll.textContent = anyCollapsed ? 'Collapse all' : 'Expand all';
  });

  block.replaceChildren(toggleAll, list);
}
