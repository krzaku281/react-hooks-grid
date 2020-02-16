export const useFormat = () => updateGrid => {
  const order = 50;
  const setGrid = grid => {
    return {
      rows: grid.map(row => {
        return {
          cells: Object.entries(row).map(([key, value]) => {
            return {
              value,
              key,
            };
          }),
        };
      }),
    };
  };

  const mixinApi = api => {};

  return { order, setGrid, mixinApi };
};
