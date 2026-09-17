/**
 * CC Hero block — the credit-cards storefront hero: a full-bleed lifestyle
 * background photo with an eyebrow, a large headline, supporting copy and CTAs
 * overlaid on the left.
 *
 * Expected authored structure (rows):
 *   row 1: background image (picture)
 *   row 2: content — eyebrow (h1/p), headline (h2), body, CTA links
 * Tolerant: text-only and image-only authoring both work.
 *
 * @param {Element} block The cc-hero block element
 */
export default function decorate(block) {
  const pictures = block.querySelectorAll('picture');
  if (pictures.length >= 1) {
    const imgDiv = pictures[0].closest('.cc-hero > div');
    if (imgDiv) imgDiv.classList.add('cc-hero-bg');
  } else {
    block.classList.add('no-image');
  }

  // The content column holds the headings/copy/CTAs.
  const heading = block.querySelector('h1, h2, h3');
  const contentDiv = heading && heading.closest('.cc-hero > div');
  if (contentDiv && !contentDiv.classList.contains('cc-hero-bg')) {
    contentDiv.classList.add('cc-hero-content');
  } else {
    // fall back: the non-bg child is the content
    [...block.children].forEach((div) => {
      if (!div.classList.contains('cc-hero-bg')) div.classList.add('cc-hero-content');
    });
  }

  // First CTA reads as the primary (gold) button; the rest as secondary
  // (outlined light) so the promo has a clear call to action.
  const content = block.querySelector('.cc-hero-content');
  if (content) {
    const ctas = content.querySelectorAll('a.button');
    ctas.forEach((a, i) => {
      if (i > 0) a.classList.add('secondary');
    });
  }
}
