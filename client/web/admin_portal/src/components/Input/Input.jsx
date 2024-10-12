import React from 'react';
import PropTypes from 'prop-types';
import './Input.css'; 

function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  name,
}) {
  return (
    <div className="input-container">
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        name={name}
        id={name}
        className={`input-field ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'textarea']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  error: '',
  disabled: false,
  required: false,
};

export default Input;
