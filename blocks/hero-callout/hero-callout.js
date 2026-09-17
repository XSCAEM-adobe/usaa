/**
 * Hero Callout block — a full-width promotional CTA banner: heading, a primary
 * button and a secondary link on the text side, with an optional illustration
 * on the other side.
 *
 * Expected authored structure: one row with a text cell (heading, CTAs) and an
 * optional image cell. Text-only is supported.
 *
 * @param {Element} block The hero-callout block element
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];
  cols.forEach((col) => {
    const pic = col.querySelector('picture');
    if (pic && !col.textContent.trim()) {
      col.classList.add('hero-callout-media');
    } else {
      col.classList.add('hero-callout-content');
    }
  });

  // Ensure a content column exists even when the image is absent.
  if (!row.querySelector('.hero-callout-content')) {
    row.firstElementChild?.classList.add('hero-callout-content');
  }
}
