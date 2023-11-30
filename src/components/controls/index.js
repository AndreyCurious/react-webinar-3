import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, getTotalPrice, numberFormat } from '../../utils';

function Controls({ basket, onOpenModal }) {
  const countUniqueProducts = basket.length;
  const getPluralWord = plural(countUniqueProducts, { one: 'товар', few: 'товара', many: 'товаров' });
  return (
    <div className='Controls'>
      <div className='Controls-interface'>
        В корзине:
        <strong
          className='Controls-interface-count'>
          {countUniqueProducts === 0 ?
            "пусто"
            :
            `${countUniqueProducts} ${getPluralWord} / ${numberFormat(getTotalPrice(basket))} ₽`
          }
        </strong>
      </div>
      <button onClick={onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  basket: PropTypes.array,
  onOpenModal: PropTypes.func
};

Controls.defaultProps = {
  onOpenModal: () => { }
}

export default React.memo(Controls);
