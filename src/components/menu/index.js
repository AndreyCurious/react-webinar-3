import { React, memo } from "react"
import { Link } from "react-router-dom"
import { cn as bem } from '@bem-react/classname';
import useDictionary from "../../store/use-dictionary";
import './style.css'


function Menu() {
  const cn = bem('Menu')
  const { currentDictionary } = useDictionary();

  return (
    <Link to={'/'} className={cn('main')}>
      {currentDictionary.main.basketTool.main}
    </Link>
  )
}


export default memo(Menu)