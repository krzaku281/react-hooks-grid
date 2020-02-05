# react-hooks-grid

Lightweight and customizable data grid for React applications from 16.8 version.

Now library is in progress.

[![npm version](https://badge.fury.io/js/react-hooks-grid.svg)](https://badge.fury.io/js/react-hooks-grid) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-hooks-grid?flat) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```sh
$ npm install react-hooks-grid
```

## Live demo

Test it! Go to [live demo](https://krzaku281.github.io/react-hooks-grid/) with 100 000 rows.

## Quick start

```sh
import { useGrid } from 'react-hooks-grid';

const DataGrid = ({data}) => {
    const { grid, setGrid, rowCount } = useGrid(data);

    return (
        <table>
            {grid.map(g => (
                <tr>
                    <td>{g.firstName}</td>
                    <td>{g.lastName}</td>
                </tr>
            ))}
        </table>
    );
};
export default DataGrid;
```

## Plugins

All useGrid's power comes from plugins that can be fully customized to developer's needs. Additionally everyone can add custom plugin for him needs and create powerful data grid.

To create your own plugin go to section useCustomPlugin.

### useSorting

useSorting(initColumn, initDescending, customSortFn)

- initColumn - initial column choice
- initDescending - initial order descending choice
- customSortFn - custom function of sorting - customFn(rowA, rowB, column, orderDescending)

setSort(columnName, descendingOrder)

- columnName - sorting by new column
- descendingOrder - sorting by new order

Multi column sorting - put array of column to columnName, array of ordering to descendingOrder and custom function to customSortFn.

```sh
import { useGrid, useSorting } from 'react-hooks-grid';

const DataGrid = ({data}) => {
    const { grid, sortColumn, sortDesc, setSort } = useGrid(data, {
        useSorting()
    });

    return (
        <table>
            <tr>
                <th>
                  <div onClick={e => setSort('firstName', !sortDesc)}>First Name</div>
                </th>
                <th>
                  <div onClick={e => setSort('lastName', !sortDesc)}>Last Name</div>
                </th>
            </tr>
            {grid.map(g => (
                <tr>
                    <td>{g.firstName}</td>
                    <td>{g.lastName}</td>
                </tr>
            ))}
        </table>
    );
};
export default DataGrid;
```

order: 30

### useFiltering

useFiltering(filters, customFilterDefinitions)

- filters - object of filters for grid. As key set id of filter and next as value set object with type of filter and column
- customFilterDefinitions - custom predicates for filters. As key put predicate name and next custom predicate function with structure: filter => row => { return predicateCondition }

setFilter(filterId, newValue)

- filterId - id of filter
- newValue - new value to filter

```sh
import { useGrid, useFiltering } from 'react-hooks-grid';

const DataGrid = ({data}) => {
    const { grid, filters, setFilter } = useGrid(data, {
        useFiltering({
            firstNameId: { type: 'contains', column: 'firstName' },
            lastNameId: { type: 'containsWithUpperCase', column: 'lastName' },
        },{
            containsWithUpperCase: filter => grid => grid[filter.column].indexOf(filter.value) > -1,
        })
    });

    return (
        <table>
            <tr>
                <th>
                    <input
                        type="text"
                        value={filters.firstName.value || ''}
                        onChange={e => setFilter('firstNameId', e.target.value)}
                    />
                    <div>First Name</div>
                </th>
                <th>
                    <input
                        type="text"
                        value={filters.lastName.value || ''}
                        onChange={e => setFilter('lastNameId', e.target.value)}
                    />
                    <div>Last Name</div>
                </th>
            </tr>
            {grid.map(g => (
                <tr>
                    <td>{g.firstName}</td>
                    <td>{g.lastName}</td>
                </tr>
            ))}
        </table>
    );
};
export default DataGrid;
```

order: 20

### usePaging

usePaging(initSize, initIndex)

- initSize - initial page size
- initIndex - initial page index

setIndex(pageIndex)

- pageIndex - new page index

setSize(pageSize)

- pageSize - new page size

```sh
import { useGrid, usePaging } from 'react-hooks-grid';
import PagingComponent from './PagingComponent'

const DataGrid = ({data}) => {
    const { grid, pageIndex, pageSize, setIndex, setSize, pageCount } = useGrid(data, {
        usePaging(10)
    });

    return (
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            {grid.map(g => (
                <tr>
                    <td>{g.firstName}</td>
                    <td>{g.lastName}</td>
                </tr>
            ))}
            <PagingComponent pageIndex={pageIndex}, pageSize={pageSize}, setIndex={setIndex}, setSize={setSize}, pageCount={pageCount} />
        </table>
    );
};
export default DataGrid;
```

order: 40

### useCustomPlugin

If existing plugins that is not enough. Create your own ;)

Each plugin will be called during the grid update in a certain order. The property order is responsible for this. When you create your own plugin set appropriate order for it.

Below is boilerplate for own plugins.

```sh
export const useCustomPlugin = (anyNumberOfParameters) => updateGrid => {
    pluginLogic

    const order = anyOrder;
    const setGrid = grid => modifyGrid;
    const mixinApi = instance => {
        Object.assign(instance, { customPublicApi });
    };

    return { order, setGrid, mixinApi };
};
```

> - anyNumberOfParameters - any number of parameters for plugin,
> - pluginLogic - all custom logic for that plugin,
> - anyOrder - set order for plugin when will be called during update grid,
> - modifyGrid - implement function which modify or calculate grid,
> - customPublicApi - expose public api for using outside,
> - updateGrid - given function for invoke when grid update will be needed. Last step in all exposed functions like setSort, setIndex setSize etc.

## Licence

MIT
