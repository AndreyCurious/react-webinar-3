import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationBar from '../../components/pagination-bar';
import useDictionary from '../../store/use-dictionary';
import Menu from '../../components/menu';
import { useSearchParams } from 'react-router-dom';
import { getPaginationArray } from '../../utils'
import Navbar from '../../components/navbar';
import Loading from '../../components/loading';

function Main() {
  const { currentDictionary } = useDictionary();
  const [params] = useSearchParams();
  const page = params.get('page');
  const store = useStore();
  useEffect(() => {
    //мы можем указать лимит выводимых продуктов, по умолчанию = 10
    !!page ?
      store.actions.catalog.loadPage(Number(page))
      :
      store.actions.catalog.loadPage()
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    isLoading: state.catalog.isLoading,
    totalCountPages: state.catalog.totalCountPages,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Перелистывание страницы
    loadNewPage: useCallback((currentPage) => store.actions.catalog.loadPage(currentPage), [store]),
    // Присылает массив, по которому будет строиться компонент пагинации
    getPaginationArray: (currentPage, totalCountPages) => getPaginationArray(currentPage, totalCountPages),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={currentDictionary.main.headTitle} />
      <Navbar>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navbar>
      {!select.isLoading ?
        <>
          <List list={select.list} renderItem={renders.item} />
          <PaginationBar
            loadNewPage={callbacks.loadNewPage}
            currentPage={select.currentPage}
            totalCountPages={select.totalCountPages}
            getPaginationArray={callbacks.getPaginationArray}
          />
        </>
        :
        <Loading />
      }
    </PageLayout>
  );
}

export default memo(Main);
