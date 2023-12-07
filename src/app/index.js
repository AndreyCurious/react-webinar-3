import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProductPage from './product-page';
import routes from '../routes';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      {activeModal === 'basket' && <Basket />}
      <Routes>
        <Route path={routes.main()} element={<Main />} />
        <Route path={routes.product()} element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
