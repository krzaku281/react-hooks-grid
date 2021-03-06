import { useState, useEffect } from 'react';
import { useFormat } from './useFormat';

export const useGrid = (initGrid, usePlugins) => {
  const [baseGrid, setBaseGrid] = useState(initGrid);
  const [outGrid, setOutGrid] = useState({ rows: [] });
  const [ticks, setTicks] = useState(0);

  const setUpdate = () => {
    setTicks(prev => (prev += 1));
  };

  const plugins = [...usePlugins, useFormat()].map(p => p(setUpdate));

  useEffect(() => {
    let newGrid = [...baseGrid];
    plugins
      .sort((a, b) => a.order - b.order)
      .forEach(p => {
        newGrid = p.setGrid(newGrid);
      });

    setOutGrid(newGrid);
  }, [baseGrid, ticks]);

  const api = {
    grid: outGrid,
    setGrid: setBaseGrid,
    rowCount: outGrid.length,
  };
  plugins.forEach(p => p.mixinApi(api));

  return api;
};
