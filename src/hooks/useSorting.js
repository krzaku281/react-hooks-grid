import { useState } from 'react';

export const useSorting = (column, descending, customSortFn) => updateGrid => {
  const [sortColumn, setSortColumn] = useState(column);
  const [sortDesc, setSortDesc] = useState(descending);

  const baseSortFn = (a, b, column, descending) => {
    if (a[column] > b[column]) return descending ? -1 : 1;
    if (a[column] < b[column]) return descending ? 1 : -1;
    return 0;
  };

  const sortFn = customSortFn || baseSortFn;

  const setSort = (column, descending) => {
    setSortColumn(column);
    setSortDesc(descending);
    updateGrid();
  };

  const order = 30;
  const setGrid = grid => grid.sort((a, b) => sortFn(a, b, sortColumn, sortDesc));
  const mixinApi = api => {
    Object.assign(api, { sortColumn, sortDesc, setSort });
  };

  return { order, setGrid, mixinApi };
};
