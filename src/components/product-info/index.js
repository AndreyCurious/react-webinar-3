import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';
import useDictionary from "../../store/use-dictionary";


function ProductInfo(props) {

  const cn = bem('Product-info')
  const { currentDictionary } = useDictionary();

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
        {currentDictionary.productPage.madeIn}
        <strong className={cn('strong')}>
          {props.currentProduct.madeIn.title}
        </strong>
        <strong className={cn('strong')}>
          ({props.currentProduct.madeIn.code})
        </strong>
      </div>
      <div className={cn('item')}>
        <span>
          {currentDictionary.productPage.category}
          <strong className={cn('strong')}>
            {props.currentProduct.category.title}
          </strong>
        </span>
      </div>
      <div className={cn('item')}>
        {currentDictionary.productPage.year}
        <strong className={cn('strong')}>
          {props.currentProduct.edition}
        </strong>
      </div>
      <div className={cn('item')}>
        <strong>
          {currentDictionary.productPage.price} {numberFormat(props.currentProduct.price)} ₽
        </strong>
      </div>
      <button onClick={callbacks.onAdd}>
        {currentDictionary.productPage.add}
      </button>
    </div>
  )
}

ProductInfo.propTypes = {
  addToBasket: PropTypes.func,
  currentProduct: PropTypes.shape({
    _id: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number
  })
};

ProductInfo.defaultProps = {
  addToBasket: () => { }
}

export default memo(ProductInfo);
