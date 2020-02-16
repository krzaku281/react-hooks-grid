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

useSorting(column, descending, customSortFn)

- column - initial column choice
- descending - initial order choice, is it descending
- customSortFn - custom function of sorting - customFn(rowA, rowB, column, descending)

setSort(column, descending)

- column - sorting by new column
- descending - sorting by new order

Special sorting rules or local difference - if is needed create own sort function and put as customSortFn

Multi column sorting - if multi sorting is needed, only change some parameters. 'column' use as array of column next 'descending' the same and and set your own sort function.

order = 30

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

### useFiltering

useFiltering(filters, customPredicates)

- filters - filters for grid. Set object where key will be id of filter and value as object with type of filter and column. See sample below.
- customPredicates - custom predicates for filters. Set object where key will be name of predicate and value as custom predicate function with below structure. You will get filter and row while you should implement predicate condition.

```sh
filter => row => { return predicateCondition }
```

setFilter(filterId, value)

- filterId - id of filter
- value - new value for filter

Filter types

> - contains
> - equals
> - greater
> - lesser

order = 20

```sh
import { useGrid, useFiltering } from 'react-hooks-grid';

const DataGrid = ({data}) => {
    const { grid, filters, setFilter } = useGrid(data, {
        useFiltering({
            firstNameId: { type: 'contains', column: 'firstName' },
            lastNameId: { type: 'containsWithUpperCase', column: 'lastName' },
        },{
            containsWithUpperCase: filter => row => row[filter.column].indexOf(filter.value) > -1,
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

### usePaging

usePaging(size, index)

- size - initial size of page
- index - initial page index

setIndex(index)

- index - new page index

setSize(size)

- size - new size of page

order = 40

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

### useFormat

Embedded plugin which changing structure of entry data. If you want to create a new plugin, you must remember about structure before or after change.

order = 50

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

- anyNumberOfParameters - any number of parameters for plugin,
- pluginLogic - all custom logic for that plugin,
- anyOrder - set order for plugin when will be called during update grid,
- modifyGrid - implement function which modify or calculate grid,
- customPublicApi - expose public api for using outside,
- updateGrid - given function for invoke when grid update will be needed. Last step in all exposed functions like setSort, setIndex setSize etc. Don't implement it. Just invoke updateGrid() when it is necessary.

## Licence

MIT
