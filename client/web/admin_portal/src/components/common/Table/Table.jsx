import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setSortConfig } from '../../../app/tableSlice';
import './Table.css';

const Table = ({ columns, data }) => {
  const dispatch = useDispatch();
  const { currentPage, rowsPerPage, sortConfig } = useSelector((state) => state.table || { 
    currentPage: 1, 
    rowsPerPage: 10, 
    sortConfig: { key: '', direction: '' } 
  });

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSortConfig({ key, direction }));
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                className="table-header"
              >
                {column.label}
                {sortConfig.key === column.key && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={`table-row ${rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}`}
            >
              {columns.map((column) => (
                <td key={column.key} className="table-cell">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">Page {currentPage}</span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage * rowsPerPage >= data.length}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
