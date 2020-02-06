import { useState } from 'react';

export const useFiltering = (initFilters, customPredicates) => updateGrid => {
  const [filters, setFilters] = useState(initFilters || {});
  const [filterFn, setFilterFn] = useState(null);
  const [rowCount, setRowCount] = useState(0);

  const setFilter = (id, value) => {
    const newFilters = Object.assign({}, filters, { [id]: Object.assign(filters[id], { value }) });
    setFilters(newFilters);

    setFilterFn(() =>
      composeFilters(
        ...Object.values(newFilters).map(f => {
          if (!f.value) return () => true;

          if (f.type === 'contains') return filterContains(f);
          if (f.type === 'equals') return filterEquals(f);
          if (f.type === 'greater') return filterGreater(f);
          if (f.type === 'lesser') return filterLesser(f);

          if (customPredicates) {
            for (let [name, predicateFn] of Object.entries(customPredicates)) {
              if (f.type === name) return predicateFn(f);
            }
          }

          return () => true;
        })
      )
    );
    updateGrid();
  };

  const combineFilters = (...filters) => value => {
    for (let i = 0; i < filters.length; i++) {
      if (filters[i](value)) continue;
      else return false;
    }

    return true;
  };

  const composeFilters = (...filters) => grid => grid.filter(combineFilters(...filters));

  const filterContains = filter => row => row[filter.column].toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
  const filterEquals = filter => row => row[filter.column] === filter.value;
  const filterGreater = filter => row => row[filter.column] > filter.value;
  const filterLesser = filter => row => row[filter.column] < filter.value;

  const order = 20;
  const setGrid = grid => {
    const newGrid = filterFn ? filterFn(grid) : grid;
    setRowCount(newGrid.length);
    return newGrid;
  };
  const mixinApi = api => {
    Object.assign(api, { filters, setFilter, rowCount });
  };

  return { order, setGrid, mixinApi };
};
