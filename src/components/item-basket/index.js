import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import routes from '../../routes';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: () => props.closeModal(),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link
        to={routes.product(props.item._id)}
        onClick={callbacks.closeModal}
        className={cn('title')}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  loadProductInfo: propTypes.func,
  closeModal: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => { },
  loadProductInfo: () => { },
  closeModal: () => { },
}

export default memo(ItemBasket);
