import { createTag } from '../../scripts/shared.js';

/**
 * Card Filter block — an interactive category filter for the credit-cards page.
 *
 * Authored content: one row per filter category label (in display order), e.g.
 *   Low Rate / Cash Back / Reward Points / Build Credit.
 * An "All cards" chip is added automatically and selected by default.
 *
 * Behaviour: each credit-card product group on the page is a section whose
 * category is declared via a `data-card-category` attribute (set from its
 * section heading). Selecting a chip shows only the matching groups; "All
 * cards" shows everything. Groups are matched by comparing the chip label to
 * each group's category (case-insensitive substring, so "Cash Back" matches a
 * "Cash Back Credit Cards" heading).
 *
 * @param {Element} block The card-filter block element
 */
export default function decorate(block) {
  // Collect authored category labels (one per row / list item).
  const labels = [...block.querySelectorAll('li, p, td')]
    .map((el) => el.textContent.trim())
    .filter(Boolean);
  const categories = [...new Set(labels)];
  if (!categories.length) {
    block.textContent = '';
    return;
  }

  const ALL = 'All cards';

  // Resolve the card groups on the page. Each credit-card grid sits in its own
  // section, preceded by a short "header" section (heading + intro copy) that
  // names the category — e.g. "Reward Points Credit Card". A group therefore
  // spans both sections, and its category is taken from the header heading (or,
  // if the products section carries its own heading, from that).
  const main = block.closest('main') || document.querySelector('main');
  const resolveGroups = () => {
    const groups = [];
    main.querySelectorAll('.cards-creditcard').forEach((grid) => {
      const productSection = grid.closest('.section') || grid.parentElement;
      if (!productSection || groups.some((g) => g.sections.includes(productSection))) return;

      const sections = [productSection];
      let heading = productSection.querySelector('h1, h2, h3');

      // Pull in the immediately-preceding header section (a section with a
      // heading but no card grid of its own) as part of this group.
      const prev = productSection.previousElementSibling;
      if (prev && prev.classList.contains('section') && !prev.querySelector('.cards-creditcard')) {
        const prevHeading = prev.querySelector('h1, h2, h3');
        if (prevHeading) {
          sections.unshift(prev);
          heading = prevHeading;
        }
      }

      groups.push({ sections, heading: heading ? heading.textContent.trim() : '' });
    });
    return groups;
  };

  const nav = createTag('div', { class: 'card-filter-chips', role: 'tablist', 'aria-label': 'Filter cards by type' });
  const chipLabels = [ALL, ...categories];
  const chips = [];

  const apply = (label) => {
    chips.forEach((c) => {
      const active = c.dataset.label === label;
      c.setAttribute('aria-selected', String(active));
      c.classList.toggle('is-active', active);
    });
    const groups = resolveGroups();
    groups.forEach(({ sections, heading }) => {
      const match = label === ALL || heading.toLowerCase().includes(label.toLowerCase());
      sections.forEach((section) => { section.hidden = !match; });
    });
  };

  chipLabels.forEach((label) => {
    const chip = createTag('button', {
      class: 'card-filter-chip',
      type: 'button',
      role: 'tab',
      'aria-selected': label === ALL ? 'true' : 'false',
    }, label);
    if (label === ALL) chip.classList.add('is-active');
    chip.dataset.label = label;
    chip.addEventListener('click', () => apply(label));
    chips.push(chip);
    nav.append(chip);
  });

  block.replaceChildren(nav);

  // Apply the default ("All cards") once the card grids exist. They are
  // decorated asynchronously, so retry briefly until at least one is present.
  let tries = 0;
  const init = () => {
    if (resolveGroups().length || tries > 20) { apply(ALL); return; }
    tries += 1;
    setTimeout(init, 100);
  };
  init();
}
