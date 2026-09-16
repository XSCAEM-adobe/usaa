/**
 * Columns Spotlight block — a two-column spotlight with a text column
 * (heading, copy, optional list, links) and a side image column.
 *
 * Expected authored structure: one row with two cells — a text cell and
 * an image cell (either order).
 *
 * @param {Element} block The columns-spotlight block element
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];
  block.classList.add(`columns-spotlight-${cols.length}-cols`);

  cols.forEach((col) => {
    const pic = col.querySelector('picture');
    if (pic && col.children.length === 1 && col.firstElementChild === pic.closest(':scope > *')) {
      col.classList.add('columns-spotlight-img');
    } else if (pic && !col.textContent.trim()) {
      col.classList.add('columns-spotlight-img');
    } else {
      col.classList.add('columns-spotlight-text');
    }
  });

  // Group the trailing CTA links so they can sit side by side, matching the
  // source layout (primary "join" button beside a tertiary text link).
  const text = row.querySelector('.columns-spotlight-text');
  if (text) {
    const buttonContainers = [...text.querySelectorAll(':scope > .button-container')];
    if (buttonContainers.length) {
      const actions = document.createElement('div');
      actions.className = 'columns-spotlight-actions';
      buttonContainers[0].before(actions);
      buttonContainers.forEach((bc) => actions.append(bc));
    }
  }
}
