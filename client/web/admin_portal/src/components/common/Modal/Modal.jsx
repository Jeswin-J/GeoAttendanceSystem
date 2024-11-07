import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Button from '../Button/Button';

function Modal({ isOpen, onClose, onContinue, title, children }) {
  if (!isOpen) return null;

  return (
      <div className="modal-overlay" aria-hidden={!isOpen}>
        <div className="modal-content" role="dialog" aria-labelledby="modal-title">
          <div className="modal-header">
            <h2 id="modal-title" className="modal-title">{title}</h2>
            <button className="modal-close" onClick={onClose} aria-label="Close">
              &times;
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button variant='danger' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='success' onClick={onContinue}>
              Continue
            </Button>
          </div>
        </div>
      </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
