import React, { memo } from "react";
import PropTypes from "prop-types";

import './style.css';
import { Link } from "react-router-dom";

function UserBar({ t, navigate, user, logOut, isAuth }) {
  return (
    <div className="Userbar">
      {isAuth ?
        <>
          <Link to={'/profile'} className="Userbar-link">{user}</Link>
          <button onClick={logOut}>
            {t('logout')}
          </button>
        </>
        :
        <>
          <button onClick={navigate}>
            {t('login')}
          </button>
        </>
      }

    </div>
  );
}



UserBar.propTypes = {
  t: PropTypes.func,
  navigate: PropTypes.func,
  user: PropTypes.string,
  logOut: PropTypes.func,
  isAuth: PropTypes.bool
};


export default memo(UserBar);