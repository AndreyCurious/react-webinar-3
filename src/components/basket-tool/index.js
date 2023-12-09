import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import useDictionary from "../../store/use-dictionary";
import Menu from "../menu";
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');

  const { currentDictionary } = useDictionary();

  return (
    <div className={cn()}>
      <Menu />
      <div>
        <span className={cn('label')}> {currentDictionary.main.basketTool.inBasket}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: currentDictionary.main.basketTool.one,
              few: currentDictionary.main.basketTool.few,
              many: currentDictionary.main.basketTool.many
            })} / ${numberFormat(sum)} ₽`
            : currentDictionary.main.basketTool.noone
          }
        </span>
        <button onClick={onOpen}>{currentDictionary.main.basketTool.follow}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
