import { useState, SyntheticEvent, ChangeEvent, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// MUI table columns
interface Column {
  id:
    | 'Orchestra'
    | 'Title'
    | 'Singer'
    | 'Style'
    | 'Composer'
    | 'Author'
    | 'Date';
  label: string;
  width?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Orchestra', label: 'Orchestra', width: 120 },
  { id: 'Title', label: 'Title', width: 120 },
  { id: 'Singer', label: 'Singer', width: 120 },
  { id: 'Style', label: 'Style', width: 120 },
  { id: 'Composer', label: 'Composer', width: 120 },
  { id: 'Author', label: 'Author', width: 120 },
  { id: 'Date', label: 'Date', width: 120 },
];

// const createData(
//   orchestra: string, title: string, singer: string, style: string, composer: string, author: string, date: string,):

// props interface
interface TracksObject {
  Orchestra: string;
  Title: string;
  Singer: string;
  Style: string;
  Composer: string;
  Author: string;
  Date: string;
}

export interface ResultsProps {
  results: TracksObject[];
}

const TracksTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  const [filter, setFilter] = useState('');
  const [filteredTracks, setFilteredTracks] = useState(results);

  const handleFilter = (e: SyntheticEvent) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setFilter(inputValue.toLowerCase());
    setFilteredTracks(
      results.filter(result => {
        return result.Title.toLowerCase().includes(inputValue.toLowerCase());
      })
    );
  };

  // material UI data table:
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search track title...."
        onChange={e => handleFilter(e)}
      ></input>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTracks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row.Title}_${
                        row.Date
                      }_${Math.random().toString()}`}
                    >
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredTracks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <div className="single-tab tab__tracks">
        <ul className="list-results">
          {filteredTracks.map(result => {
            return (
              <li key={`${result.Title}-${result.Date}-${result.Orchestra}`}>
                {result.Title}, by orchestra {result.Orchestra} (year{' '}
                {result.Date.slice(0, 4)})
              </li>
            );
          })}
        </ul>
      </div> */}
    </>
  );
};

export default TracksTab;
