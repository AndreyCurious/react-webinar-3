import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, numberFormat } from '../../utils';

function Controls({ basket, onOpenModal }) {
  console.log(basket)
  const getPluralWord = plural(basket.productsCount, { one: 'товар', few: 'товара', many: 'товаров' });
  return (
    <div className='Controls'>
      <div className='Controls-interface'>
        В корзине:
        <strong
          className='Controls-interface-count'>
          {basket.productsCount === 0 ?
            "пусто"
            :
            `${basket.productsCount} ${getPluralWord} / ${numberFormat(basket.allPrice)} ₽`
          }
        </strong>
      </div>
      <button onClick={onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  basket: PropTypes.shape({
    products: PropTypes.array,
    allPrice: PropTypes.number,
    productsCount: PropTypes.number,
  }),
  onOpenModal: PropTypes.func
};

Controls.defaultProps = {
  onOpenModal: () => { }
}

export default React.memo(Controls);
