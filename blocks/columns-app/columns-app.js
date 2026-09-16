/**
 * Columns App block — a dark two-column app-promo. One column holds a
 * phone screenshot; the other holds a heading, copy, app-store badges
 * and an optional QR code.
 *
 * Expected authored structure: one row with two cells — an image cell
 * (phone) and a text cell (heading, copy, badge links, QR image).
 *
 * @param {Element} block The columns-app block element
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];
  block.classList.add(`columns-app-${cols.length}-cols`);

  cols.forEach((col) => {
    const pic = col.querySelector('picture');
    // A column that is only a picture is the phone screenshot column.
    if (pic && !col.textContent.trim()) {
      col.classList.add('columns-app-img');
    } else {
      col.classList.add('columns-app-text');
      // Collect app-store badge links (a paragraph whose only content is a
      // link wrapping an image) and move them into one row so the badges
      // lay out side by side rather than stacking as separate flex items.
      const badgeParas = [...col.querySelectorAll(':scope > p')].filter((p) => {
        const a = p.querySelector('a');
        return a && a.querySelector('picture, img') && !p.textContent.trim();
      });
      if (badgeParas.length) {
        const wrap = document.createElement('div');
        wrap.className = 'columns-app-badges';
        badgeParas.forEach((p) => {
          wrap.append(p.querySelector('a'));
          p.remove();
        });
        col.append(wrap);
      }
    }
  });
}
