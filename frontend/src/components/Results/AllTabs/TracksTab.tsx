import { useState, SyntheticEvent, ChangeEvent, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

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
  height?: number;
  format?: (value: number) => string;
}

// MUI table columns
const columns: readonly Column[] = [
  { id: 'Title', label: 'Title', width: 120 },
  { id: 'Orchestra', label: 'Orchestra', width: 120 },
  { id: 'Style', label: 'Style', width: 80 },
  // TBD: showing other available options in the table or on click/hover
  // { id: 'Singer', label: 'Singer', width: 120 },
  // { id: 'Composer', label: 'Composer', width: 120 },
  // { id: 'Author', label: 'Author', width: 120 },
  { id: 'Date', label: 'Date', width: 30 },
];

// props
interface TracksObject {
  Orchestra: string;
  Title: string;
  Singer: string;
  Style: string;
  Composer: string;
  Author: string;
  Date: string;
}

// props
export interface ResultsProps {
  results: TracksObject[];
}

const TracksTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  const [filteredTracks, setFilteredTracks] = useState(results);

  const handleFilter = (e: SyntheticEvent) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setFilteredTracks(
      results.filter(result => {
        return result.Title.toLowerCase().includes(inputValue.toLowerCase());
      })
    );
    setPage(0);
  };

  // material UI data table state and handlers:
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
        placeholder="Search within tracks"
        onChange={e => handleFilter(e)}
        className="results-tracks__input"
      />
      <Paper sx={{ width: '90vw', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 650, backgroundColor: '#87aa8f' }}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    sx={{
                      color: 'white',
                      backgroundColor: '#505e53ec',
                      zIndex: 0,
                    }}
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
                      hover={true}
                      tabIndex={-1}
                      key={`${row.Title}_${
                        row.Date
                      }_${Math.random().toString()}`}
                    >
                      {columns.map(column => {
                        const value: string = row[column.id];
                        const isLongValue: boolean =
                          value.length > 25 ? true : false;
                        return (
                          <Tooltip
                            title={isLongValue ? value : ''}
                            enterDelay={200}
                            placement="bottom-start"
                            arrow
                            key={column.id}
                          >
                            <TableCell
                              sx={{
                                color: 'white',
                                backgroundColor: '#5f7264',
                                zIndex: 0,
                              }}
                              key={column.id}
                              align={column.align}
                            >
                              {isLongValue ? `${value.slice(0, 25)}...` : value}
                            </TableCell>
                          </Tooltip>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color: 'white', backgroundColor: '#505e53ec' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredTracks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TracksTab;
