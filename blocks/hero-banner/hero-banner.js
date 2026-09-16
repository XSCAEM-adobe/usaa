/**
 * Hero Banner block
 * Full-bleed background image with a headline, optional subheading,
 * an optional inline input (e.g. ZIP lookup) and a call-to-action.
 *
 * Expected authored structure (rows):
 *   row 1 (optional): background image (picture)
 *   row 2: text content — heading, subheading paragraph(s), input, CTA button(s)
 * The block is tolerant: text-only and image-only authoring both work.
 *
 * @param {Element} block The hero-banner block element
 */
export default function decorate(block) {
  const pictures = block.querySelectorAll('picture');

  if (pictures.length >= 1) {
    // Treat the first picture as the full-bleed background image.
    const imgDiv = pictures[0].closest('.hero-banner > div');
    if (imgDiv) imgDiv.classList.add('hero-banner-bg');
  } else {
    block.classList.add('no-image');
  }

  const heading = block.querySelector('h1, h2, h3');
  if (!heading) return;

  // The content column is the div that holds the heading.
  const contentDiv = heading.closest('.hero-banner > div');
  if (!contentDiv) return;
  contentDiv.classList.add('hero-banner-content');

  // Mark any paragraph before the heading as a tagline/eyebrow.
  const children = [...contentDiv.children];
  const headingIndex = children.indexOf(heading);
  for (let i = 0; i < headingIndex; i += 1) {
    if (children[i].tagName === 'P' && !children[i].classList.contains('button-container')) {
      children[i].classList.add('hero-banner-tagline');
      break;
    }
  }

  // If an <input> was authored (e.g. ZIP lookup), group it with the CTA.
  const input = contentDiv.querySelector('input');
  if (input) {
    const actionRow = input.closest('p') || input.parentElement;
    if (actionRow) actionRow.classList.add('hero-banner-action');
  }
}
