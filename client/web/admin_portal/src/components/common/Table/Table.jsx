import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setSortConfig, setSearchTerm, setFilter } from '../../../app/tableSlice';
import './Table.css';
import Button from '../Button/Button';
import Input from '../Input/Input'
import Select from '../Select/Select';
import { useNavigate } from 'react-router-dom';

const Table = ({tableHeading, columns, data, filterOptions }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRowClick = (locationId) => {
        navigate(`/location/${locationId}`);
    };

  const { currentPage, rowsPerPage, sortConfig, searchTerm, filter } = useSelector((state) => state.table || { 
    currentPage: 1, 
    rowsPerPage: 10, 
    sortConfig: { key: '', direction: '' },
    searchTerm: '',
    filter: ''
  });

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSortConfig({ key, direction }));
  };

  const filteredData = React.useMemo(() => {
    return data.filter(row => {
      const rowValues = Object.values(row).join(' ').toLowerCase();
      const matchesSearch = rowValues.includes(searchTerm.toLowerCase());
      const matchesFilter = filter ? row.division === filter : true;
      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filter]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  return (
    <div className="table-container">
        <div className="search-filter-container">
            <h2 className="table-heading">{tableHeading}</h2>
            <div className="controls-container">
                <Input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))} 
                className="search-input"
                name="search"/>
                
                <Select  
                options={filterOptions} 
                value={filter} 
                onChange={(e) => dispatch(setFilter(e.target.value))} 
                disabled={false}
                />
            </div>
        </div>

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
          {sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((row, rowIndex) => (
              <tr
                  key={row.locationId || rowIndex}
                  onClick={() => handleRowClick(row.locationId)}
                  className="table-row"
                  style={{cursor: 'pointer'}}
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
            <Button
                onClick={() => dispatch(setPage(currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Previous
            </Button>
            <span className="pagination-info">Page {currentPage}</span>
            <Button
                onClick={() => dispatch(setPage(currentPage + 1))}
                disabled={currentPage * rowsPerPage >= sortedData.length}
          className="pagination-button"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Table;
