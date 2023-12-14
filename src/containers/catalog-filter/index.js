import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import { getCatigoriesChildrens } from "../../utils";
/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
    categoryId: state.catalog.params.categoryId
  }));


  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Категории
    onCategory: useCallback(categoryId => store.actions.catalog.setParams({ categoryId }), [store])
  };

  const options = {
    sort: useMemo(() => ([
      { _id: 'order', title: 'По порядку' },
      { _id: 'title.ru', title: 'По именованию' },
      { _id: '-price', title: 'Сначала дорогие' },
      { _id: 'edition', title: 'Древние' },
    ]), [])
  };

  const { t } = useTranslate();
  return (
    <SideLayout padding='medium'>
      <Select class={'Select-categories'} options={getCatigoriesChildrens(select.categories)} value={select.categoryId} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
        delay={1000} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
