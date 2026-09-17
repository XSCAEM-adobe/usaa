/**
 * Table Rate block — a simple data table (rate/APY style). The first authored
 * row is the header; remaining rows are data. Rendered as a semantic <table>.
 *
 * @param {Element} block The table-rate block element
 */
export default function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.append(thead, tbody);

  [...block.children].forEach((child, i) => {
    const row = document.createElement('tr');
    if (i === 0) thead.append(row);
    else tbody.append(row);

    [...child.children].forEach((col) => {
      const cell = document.createElement(i === 0 ? 'th' : 'td');
      if (i === 0) cell.setAttribute('scope', 'col');
      cell.innerHTML = col.innerHTML;
      row.append(cell);
    });
  });

  block.replaceChildren(table);
}
