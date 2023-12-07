import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';


function ProductInfo(props) {

  const cn = bem('Product-info')

  const callbacks = {
    onAdd: () => props.addToBasket(props.currentProduct._id),
  }

  return (
    <div className={cn()}>
      <div className={cn('item')}>
        <span>
          {props.currentProduct.description}
        </span>
      </div>
      <div className={cn('item')}>
        Страна производитель:
        <strong className={cn('strong')}>
          {props.currentProduct.madeIn.title}
        </strong>
        <strong className={cn('strong')}>
          ({props.currentProduct.madeIn.code})
        </strong>
      </div>
      <div className={cn('item')}>
        <span>
          Категория:
          <strong className={cn('strong')}>
            {props.currentProduct.category.title}
          </strong>
        </span>
      </div>
      <div className={cn('item')}>
        Год выпуска:
        <strong className={cn('strong')}>
          {props.currentProduct.edition}
        </strong>
      </div>
      <div className={cn('item')}>
        <strong>
          Цена: {numberFormat(props.currentProduct.price)} ₽
        </strong>
      </div>
      <button onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  )
}

ProductInfo.propTypes = {
  currentProduct: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
    price: PropTypes.number
  }),
  addToBasket: PropTypes.func
};

ProductInfo.defaultProps = {
  addToBasket: () => { }
}

export default memo(ProductInfo);
