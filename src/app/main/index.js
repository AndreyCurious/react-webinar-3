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

function Main() {
  const { currentDictionary } = useDictionary();
  const store = useStore();
  useEffect(() => {
    // при первом рендере 2 параметром мы можем указать лимит выводимых продуктов, по умолчанию = 10
    store.actions.catalog.firstLoad(select.currentPage);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
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
    loadNewPage: useCallback((currentPage) => store.actions.catalog.loadNewPage(currentPage), [store]),
    // Присылает массив, по которому будет строиться компонент пагинации
    getPaginationArray: useCallback((currentPage, totalCountPages) => store.actions.catalog.getPaginationArray(currentPage, totalCountPages), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={currentDictionary.main.headTitle} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      >
      </BasketTool>
      <List list={select.list} renderItem={renders.item} />
      <PaginationBar
        loadNewPage={callbacks.loadNewPage}
        currentPage={select.currentPage}
        totalCountPages={select.totalCountPages}
        getPaginationArray={callbacks.getPaginationArray}
      />
    </PageLayout>
  );
}

export default memo(Main);
