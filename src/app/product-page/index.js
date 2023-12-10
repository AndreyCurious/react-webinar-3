import { memo, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductInfo from '../../components/product-info';
import { useLocation } from "react-router-dom";
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import Loading from '../../components/loading';

function ProductPage() {
  const store = useStore();
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const id = pathname[pathname.length - 1].slice(1)
  useEffect(() => {
    store.actions.product.loadProductInfo(id)
  }, [id])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    isLoading: state.product.isLoading,
    sum: state.basket.sum,
    currentProduct: state.product.currentProduct,
  }))
  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }
  return (
    <PageLayout>
      <Head title={select.isLoading ? undefined : select.currentProduct.title} />
      <Navbar>
        <Menu />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum}
        />
      </Navbar>
      {!select.isLoading ?
        <ProductInfo currentProduct={select.currentProduct} addToBasket={callbacks.addToBasket} />
        :
        <Loading />
      }
    </PageLayout>
  )
}

export default memo(ProductPage);