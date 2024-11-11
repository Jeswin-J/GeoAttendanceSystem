import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setPage, setSortConfig } from '../../../app/tableSlice';
import './Table.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Lottie from "lottie-react";
import noRecordFound from '../../../assets/animations/noRecordFound.json';

const Table = ({
                   tableHeading,
                   columns,
                   data,
                   onRowClick,
                   showPagination = true,
                   showSearch = true,
                   showFilter = true,
               }) => {
    const dispatch = useDispatch();
    const { currentPage, rowsPerPage, sortConfig, searchTerm } = useSelector((state) => state.table);

    const [filterColumn, setFilterColumn] = useState('');  // Track the selected column for search

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        dispatch(setSortConfig({ key, direction }));
    };

    const handleSearchTermChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleFilterColumnChange = (e) => {
        setFilterColumn(e.target.value);  // Update filter column
    };

    const filteredData = useMemo(() => {
        return data.filter((row) => {
            // If no column is selected, search across all columns
            if (!filterColumn) {
                return Object.values(row).some(value =>
                    (value ? value.toString().toLowerCase() : '').includes(searchTerm.toLowerCase())
                );
            }

            // If a column is selected, search only in that column
            const cellValue = row[filterColumn];
            return (cellValue ? cellValue.toString().toLowerCase() : '').includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm, filterColumn]);  // Recalculate when the filterColumn changes

    const sortedData = useMemo(() => {
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

                {showSearch && (
                    <div className="controls-container">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            className="search-input"
                        />

                        {showFilter && (
                            <Select
                                options={[{ value: '', label: 'All Columns' }, ...columns.map(col => ({ value: col.key, label: col.label }))]}
                                value={filterColumn}
                                onChange={handleFilterColumnChange}
                            />
                        )}
                    </div>
                )}
            </div>

            {sortedData.length === 0 ? (
                <div className="no-data-container">
                    <Lottie options={{ loop: true }} animationData={noRecordFound} />
                    <p>No records found</p>
                </div>
            ) : (
                <>
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

                    {showPagination && (
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
                    )}
                </>
            )}
        </div>
    );
};

export default Table;
