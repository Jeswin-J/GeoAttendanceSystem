import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  onClick,
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const buttonClasses = `button ${variant} ${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
        {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
};

export default Button;
