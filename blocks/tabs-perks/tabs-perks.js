import { toClassName } from '../../scripts/aem.js';

/**
 * Groups the flat panel content into an intro heading + a grid of cards.
 * The authored/decorated panel is a flat sequence: an optional intro <h2>,
 * then repeating groups of [icon (p>picture), <h3> title, <p> description,
 * <p> CTA link]. A new card begins at each icon or <h3>.
 *
 * @param {Element} panel The panel element holding raw content
 */
function buildPanelGrid(panel) {
  const nodes = [...panel.children];
  const intro = document.createElement('div');
  intro.className = 'tabs-perks-intro';
  const grid = document.createElement('div');
  grid.className = 'tabs-perks-grid';

  // A new card begins at each icon paragraph (a <p> wrapping a picture/img).
  // Content before the first icon (e.g. the section intro heading) is the intro.
  const isIcon = (el) => el.matches('p') && el.querySelector('picture, img');
  let current = null;

  nodes.forEach((el) => {
    if (isIcon(el)) {
      current = document.createElement('div');
      current.className = 'tabs-perks-card';
      grid.append(current);
      el.classList.add('tabs-perks-card-icon');
    }
    (current || intro).append(el);
  });

  panel.replaceChildren();
  if (intro.childElementCount) panel.append(intro);
  if (grid.childElementCount) panel.append(grid);
}

/**
 * Tabs Perks block — a self-contained tabbed catalog. Each authored row
 * is one tab: the first cell is the tab label, the second cell is the
 * panel content (an intro heading + a grid of savings-category cards).
 *
 * @param {Element} block The tabs-perks block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const tablist = document.createElement('div');
  tablist.className = 'tabs-perks-list';
  tablist.setAttribute('role', 'tablist');

  const panels = document.createElement('div');
  panels.className = 'tabs-perks-panels';

  const buttons = [];
  const panelEls = [];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const contentCell = cells[1] || document.createElement('div');

    const label = (labelCell?.textContent || `Tab ${i + 1}`).trim();
    const id = `${toClassName(label) || `tab-${i + 1}`}`;

    const button = document.createElement('button');
    button.className = 'tabs-perks-tab';
    button.type = 'button';
    button.role = 'tab';
    button.id = `tabs-perks-tab-${id}`;
    button.setAttribute('aria-controls', `tabs-perks-panel-${id}`);
    button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    button.classList.toggle('is-active', i === 0);
    button.textContent = label;

    const panel = document.createElement('div');
    panel.className = 'tabs-perks-panel';
    panel.role = 'tabpanel';
    panel.id = `tabs-perks-panel-${id}`;
    panel.setAttribute('aria-labelledby', button.id);
    panel.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    while (contentCell.firstChild) panel.append(contentCell.firstChild);
    buildPanelGrid(panel);

    button.addEventListener('click', () => {
      buttons.forEach((b, bi) => {
        const selected = b === button;
        b.setAttribute('aria-selected', selected ? 'true' : 'false');
        b.classList.toggle('is-active', selected);
        panelEls[bi].setAttribute('aria-hidden', selected ? 'false' : 'true');
      });
    });

    buttons.push(button);
    panelEls.push(panel);
    tablist.append(button);
    panels.append(panel);
  });

  block.replaceChildren(tablist, panels);
}
