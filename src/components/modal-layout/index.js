import { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useDictionary from '../../store/use-dictionary';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout(props) {
  const { currentDictionary } = useDictionary();

  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef();
  const frame = useRef();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      layout.current.style.alignItems = (layout.current.clientHeight < frame.current.clientHeight)
        ? 'flex-start'
        : 'center';
      layout.current.style.justifyContent = (layout.current.clientWidth < frame.current.clientWidth)
        ? 'flex-start'
        : 'center';
    });
    // Следим за изменениями размеров layout
    resizeObserver.observe(layout.current);
    return () => {
      resizeObserver.disconnect();
    }
  }, []);

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{currentDictionary.modals.basket.title}</h1>
          <button className={cn('close')} onClick={props.onClose}>{currentDictionary.modals.basket.close}</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

ModalLayout.defaultProps = {
  onClose: () => { }
};

export default memo(ModalLayout);
