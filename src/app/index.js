import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useInit from '../hooks/use-init';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import UserAuth from '../containers/user-auth';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  useInit(() => {
    store.actions.sessionState.autoLogin();
  }, [], true);


  const activeModal = useSelector(state => state.modals.name);
  const isAuth = useSelector(state => state.sessionState.isAuth);

  return (
    <>
      <Routes>
        <Route path={'/profile'} element={<UserAuth><Profile /></UserAuth>} />
        <Route path={'/login'} element={isAuth ? <Navigate to={'/'} /> : <Login />} />
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
