import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Navbar({ children }) {
  const cn = bem('Navbar')
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

Navbar.propTypes = {
  children: PropTypes.node,
};


export default memo(Navbar);
