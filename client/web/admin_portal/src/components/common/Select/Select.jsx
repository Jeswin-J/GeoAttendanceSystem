import React from 'react';
import './Select.css';

const Select = ({ label, options, value, onChange, error, disabled }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <select
        className={`input-field ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
        value={value}
        onChange={onChange}
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
