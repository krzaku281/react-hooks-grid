import { useState } from 'react';

export const usePaging = (size, index) => updateGrid => {
  const [pageIndex, setPageIndex] = useState(index || 0);
  const [pageSize, setPageSize] = useState(size || 10);

  const setSize = size => {
    setPageSize(size);
    updateGrid();
  };
  const setIndex = index => {
    setPageIndex(index);
    updateGrid();
  };

  const order = 40;
  const setGrid = grid => grid.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  const mixinApi = api => {
    Object.assign(api, {
      pageIndex,
      pageSize,
      setIndex,
      setSize,
      pageCount: Math.ceil(api.rowCount / pageSize),
    });
  };

  return { order, setGrid, mixinApi };
};
