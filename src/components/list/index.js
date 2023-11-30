import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Item buttonTitle={props.buttonTitle} funcButton={props.funcButton} item={item} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.array,
  funcButton: PropTypes.func,
  buttonTitle: PropTypes.node
};

List.defaultProps = {
  funcButton: () => {
  },
}

export default React.memo(List);
