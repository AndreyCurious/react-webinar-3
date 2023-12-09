import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import useDictionary from '../../store/use-dictionary';
import './style.css';

function BasketTotal({ sum }) {
  const { currentDictionary } = useDictionary();
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{currentDictionary.modals.basket.total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
