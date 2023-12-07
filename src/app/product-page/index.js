import { memo, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductInfo from '../../components/product-info';
import { useLocation } from "react-router-dom";

function ProductPage() {
  const store = useStore();
  const location = useLocation();
  const id = location.pathname.slice(2);

  useEffect(() => {
    store.actions.catalog.loadProductInfo(id)
  }, [])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentProduct: state.catalog.currentProduct,
  }))

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.currentProduct.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum}
      />
      <ProductInfo currentProduct={select.currentProduct} addToBasket={callbacks.addToBasket} />
    </PageLayout>
  )
}

export default memo(ProductPage);