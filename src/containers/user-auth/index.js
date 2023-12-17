import { memo } from 'react';
import useSelector from "../../hooks/use-selector";
import { Navigate } from 'react-router-dom';

function UserAuth({ children }) {

  const select = useSelector(state => ({
    hasToken: state.sessionState.hasToken,
    isAuth: state.sessionState.isAuth
  }));

  if (!select.isAuth && !select.hasToken) {
    return <Navigate to={'/login'} />
  }
  return children;
}

export default memo(UserAuth);