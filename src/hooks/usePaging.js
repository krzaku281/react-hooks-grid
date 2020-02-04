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
  const mixinApi = instance => {
    Object.assign(instance, {
      pageIndex,
      pageSize,
      setIndex,
      setSize,
      pageCount: Math.ceil(instance.rowCount / pageSize),
    });
  };

  return { order, setGrid, mixinApi };
};
