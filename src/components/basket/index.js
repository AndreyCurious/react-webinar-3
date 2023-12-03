import React from "react";
import List from "../list"
import PropTypes from 'prop-types';
import { numberFormat } from "../../utils";
import './style.css';

function Basket(props) {
  return (
    <>
      <div className="Basket-modal-content-header">
        <h1 className="Basket-modal-content-header-title">{props.titileModal}</h1>
        <div className="Basket-modal-content-header-button">
          <button onClick={props.onCloseModal}>Закрыть</button>
        </div>
      </div>
      <div className="Basket-modal-content-body">
        <List list={props.basket.products}
          funcButton={props.funcButton}
          buttonTitle="Удалить"
        />
      </div>
      <div className="Basket-modal-content-footer">
        <strong className="Basket-modal-content-footer-info">
          <span className="Basket-modal-content-footer-info-sum">Итого</span>
          <span className="Basket-modal-content-footer-info-price">{`${numberFormat(props.basket.allPrice)} ₽`}</span>
        </strong>
      </div>
    </>
  )
}

Basket.propTypes = {
  titileModal: PropTypes.node,
  isOpen: PropTypes.bool,
  basket: PropTypes.shape({
    products: PropTypes.array,
    allPrice: PropTypes.number
  }),
  onCloseModal: PropTypes.func,
  funcButton: PropTypes.func
};

Basket.defaultProps = {
  funcButton: () => {
  },
}

export default React.memo(Basket);