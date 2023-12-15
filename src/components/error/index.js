import { memo } from 'react';
import PropTypes from "prop-types";

import './style.css';

function Error(props) {

  return (
    <>
      {props.error ?
        <div className="Error">
          {props.error}
        </div>
        :
        <></>
      }
    </>

  )
}

Error.propTypes = {
  error: PropTypes.string
}


export default memo(Error);
