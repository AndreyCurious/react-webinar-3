import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import UserBar from '../../components/user-bar';
import { useNavigate } from 'react-router-dom';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const navigate = useNavigate()
  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.sessionState.refreshErrors();
  }, [], true);

  const select = useSelector(state => ({
    user: state.sessionState.user,
    isAuth: state.sessionState.isAuth
  }));

  const callbacks = {
    navigateToLogin: () => navigate('/login'),
    logOut: useCallback(() => store.actions.sessionState.logOut(), [store])
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserBar isAuth={select.isAuth} logOut={callbacks.logOut} user={select.user.profile?.name} navigate={callbacks.navigateToLogin} t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
