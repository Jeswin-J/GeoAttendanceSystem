import React from 'react';
import './Select.css';

const Select = ({ label, options, value, onChange, name, error, disabled }) => {
    return (
        <div className="select-container">
            {label && <label className="select-label">{label}</label>}
            <select
                className={`select-field ${error ? 'select-error' : ''} ${disabled ? 'select-disabled' : ''}`}
                value={value}
                onChange={onChange}
                name={name}
                disabled={disabled}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Select;
