/**
 * Columns Links block — a wayfinding directory of several columns, each
 * with a heading followed by a list of links.
 *
 * Expected authored structure: one row whose cells are the columns; each
 * cell holds a heading and a link list.
 *
 * @param {Element} block The columns-links block element
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];
  block.classList.add(`columns-links-${cols.length}-cols`);

  cols.forEach((col) => {
    col.classList.add('columns-links-col');
  });
}
