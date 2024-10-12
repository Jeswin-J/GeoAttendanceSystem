import React from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

function Notification({ message, type = 'info', onClose }) {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button className="notification-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func.isRequired,
};

export default Notification;
