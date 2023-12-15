import { memo } from 'react';
import PropTypes from "prop-types";

import './style.css';

function ButtonSubmit(props) {
  return (
    <button disabled={props.isLoad} type="submit">{props.titleButton}</button>
  )
}

ButtonSubmit.propTypes = {
  isLoad: PropTypes.bool,
  titleButton: PropTypes.string
}

ButtonSubmit.defaultProps = {
  titleButton: 'Кнопка',
  isLoad: false
}


export default memo(ButtonSubmit);