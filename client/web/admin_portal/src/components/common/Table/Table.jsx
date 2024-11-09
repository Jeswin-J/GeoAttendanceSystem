import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setSortConfig, setSearchTerm, setFilter } from '../../../app/tableSlice';
import './Table.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';

const Table = ({
                   tableHeading,
                   columns,
                   data,
                   filterOptions = [],
                   onRowClick,
                   filterFunction,
                   customSearchFields
               }) => {
    const dispatch = useDispatch();
    const { currentPage, rowsPerPage, sortConfig, searchTerm, filter } = useSelector((state) => state.table);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        dispatch(setSortConfig({ key, direction }));
    };

    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    const filteredData = React.useMemo(() => {
        return data.filter((row) => {
            const searchMatch = customSearchFields
                ? customSearchFields.some((field) => row[field].toLowerCase().includes(searchTerm.toLowerCase()))
                : Object.values(row).join(' ').toLowerCase().includes(searchTerm.toLowerCase());

            const filterMatch = filter ? filterFunction(row, filter) : true;
            return searchMatch && filterMatch;
        });
    }, [data, searchTerm, filter, customSearchFields, filterFunction]);

    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            return (aValue < bValue ? -1 : 1) * (sortConfig.direction === 'asc' ? 1 : -1);
        });
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
                    />

                    {filterOptions.length > 0 && (
                        <Select
                            options={filterOptions}
                            value={filter}
                            onChange={handleFilterChange}
                        />
                    )}
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
                        key={row.id || rowIndex}
                        onClick={() => onRowClick && onRowClick(row)}
                        className="table-row"
                        style={{ cursor: onRowClick ? 'pointer' : 'default' }}
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
                    <i className="bi bi-arrow-left"></i>
                </Button>
                <span className="pagination-info">Page {currentPage}</span>
                <Button
                    onClick={() => dispatch(setPage(currentPage + 1))}
                    disabled={currentPage * rowsPerPage >= sortedData.length}
                    className="pagination-button"
                >
                    <i className="bi bi-arrow-right"></i>
                </Button>
            </div>
        </div>
    );
};

export default Table;