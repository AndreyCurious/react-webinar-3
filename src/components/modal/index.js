import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import List from "../list";
import { numberFormat, getTotalPrice } from "../../utils";

function Modal(props) {
  return (
    <div className={`Modal ${props.isOpen ? 'Modal-active' : ''}`} onClick={props.onCloseModal}>
      <div className={`Modal-content ${props.isOpen ? 'Modal-content-active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="Modal-content-header">
          <h1 className="Modal-content-header-title">{props.titileModal}</h1>
          <div className="Modal-content-header-button">
            <button onClick={props.onCloseModal}>Закрыть</button>
          </div>
        </div>
        <div className="Modal-content-body">
          <List list={props.basket}
            funcButton={props.funcButton}
            buttonTitle="Удалить"
          />
        </div>
        <div className="Modal-content-footer">
          <strong className="Modal-content-footer-info">
            <span className="Modal-content-footer-info-sum">Итого</span>
            <span className="Modal-content-footer-info-price">{`${numberFormat(getTotalPrice(props.basket))} ₽`}</span>
          </strong>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  titileModal: PropTypes.node,
  isOpen: PropTypes.bool,
  basket: PropTypes.array,
  onCloseModal: PropTypes.func,
  funcButton: PropTypes.func
};

Modal.defaultProps = {
  onCloseModal: () => { },
  funcButton: () => { }
}

export default React.memo(Modal);