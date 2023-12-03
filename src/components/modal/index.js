import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal(props) {
  return (
    <div className={`Modal ${props.isOpen ? 'Modal-active' : ''}`} onClick={props.onCloseModal}>
      <div className={`Modal-content ${props.isOpen ? 'Modal-content-active' : ''}`} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

Modal.defaultProps = {
  onCloseModal: () => { },
  funcButton: () => { }
}

export default React.memo(Modal);