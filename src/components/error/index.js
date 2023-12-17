import { memo } from 'react';
import PropTypes from "prop-types";

import './style.css';

function Error(props) {

  return (
    <>
      {props.error ?
        <div className="Error">
          {props.error.map(item => item)}
        </div>
        :
        <></>
      }
    </>

  )
}

Error.propTypes = {
  error: PropTypes.array
}


export default memo(Error);
