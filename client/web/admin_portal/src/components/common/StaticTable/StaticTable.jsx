import React from 'react';
import './StaticTable.css';

const StaticTable = ({ columns, data }) => {
    return (
        <div className="static-table-container">
            <table className="simple-static-table">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column.key}>{row[column.key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaticTable;
