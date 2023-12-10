import { React, memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useDictionary from "../../store/use-dictionary";
import './style.css';


function Menu({ children }) {
  const cn = bem('Menu')
  const { currentDictionary } = useDictionary();

  return (
    <div className={cn()}>
      <Link to={`/?page=1`} className={cn('main')}>
        {currentDictionary.main.basketTool.main}
      </Link>
      {children}
    </div>
  )
}

Menu.propsTypes = {
  children: PropTypes.node
}


export default memo(Menu)