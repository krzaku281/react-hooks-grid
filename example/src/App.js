import React from 'react';
import dataCreator from './services/dataCreator';
import { useGrid, useFiltering, useSorting, usePaging } from 'react-hooks-grid';
import { Table, Row, Container } from 'reactstrap';

import PagingComponent from './components/PagingComponent';

const App = () => {
  const dataGrid = React.useMemo(() => dataCreator(100000), []);

  const {
    grid,
    sortDesc,
    setSort,
    filters,
    setFilter,
    rowCount,
    pageCount,
    pageIndex,
    pageSize,
    setIndex,
    setSize,
  } = useGrid(dataGrid, [
    useSorting('lastName', false),
    useFiltering(
      {
        firstName: { type: 'contains', column: 'firstName' },
        lastName: { type: 'containsWithUpperCase', column: 'lastName' },
        job: { type: 'contains', column: 'job' },
        greaterPoints: { type: 'greater', column: 'points' },
        lesserPoints: { type: 'lesser', column: 'points' },
      },
      {
        containsWithUpperCase: filter => grid => grid[filter.column].indexOf(filter.value) > -1,
      }
    ),
    usePaging(10),
  ]);

  return (
    <>
      <Container>
        <Row>
          <Table>
            <thead>
              <tr>
                <th key={'firstName'}>
                  <input
                    type="text"
                    value={filters.firstName.value || ''}
                    onChange={e => setFilter('firstName', e.target.value)}
                    placeholder={'Contains'}
                  />
                  <div onClick={e => setSort('firstName', !sortDesc)}>First Name</div>
                </th>
                <th key={'lastName'}>
                  <input
                    type="text"
                    value={filters.lastName.value || ''}
                    onChange={e => setFilter('lastName', e.target.value)}
                    placeholder={'Uppercase contains'}
                  />
                  <div onClick={e => setSort('lastName', !sortDesc)}>Last Name</div>
                </th>
                <th key={'job'}>
                  <input
                    type="text"
                    value={filters.job.value || ''}
                    onChange={e => setFilter('job', e.target.value)}
                    placeholder={'Contains'}
                  />
                  <div onClick={e => setSort('job', !sortDesc)}>Job</div>
                </th>
                <th key={'phone'}>
                  <div onClick={e => setSort('phone', !sortDesc)}>Phone</div>
                </th>
                <th key={'birthDate'}>
                  <div onClick={e => setSort('birthDate', !sortDesc)}>Birth Date</div>
                </th>
                <th key={'points'}>
                  <input
                    type="number"
                    value={filters.greaterPoints.value || ''}
                    onChange={e => setFilter('greaterPoints', e.target.value)}
                    placeholder={'Greater than'}
                  />
                  <input
                    type="number"
                    value={filters.lesserPoints.value || ''}
                    onChange={e => setFilter('lesserPoints', e.target.value)}
                    placeholder={'Lesser than'}
                  />
                  <div onClick={e => setSort('points', !sortDesc)}>Points</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {grid.map(g => (
                <tr>
                  <td>{g.firstName}</td>
                  <td>{g.lastName}</td>
                  <td>{g.job}</td>
                  <td>{g.phone}</td>
                  <td>{g.birthDate.toLocaleDateString()}</td>
                  <td>{g.points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row>
          <PagingComponent
            page={pageIndex + 1}
            pageIndex={pageIndex}
            setIndex={setIndex}
            setSize={setSize}
            pageSize={pageSize}
            pageCount={pageCount}
            rowCount={rowCount}
          />
        </Row>
      </Container>
    </>
  );
};
export default App;
