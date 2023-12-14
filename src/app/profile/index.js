import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import UserBar from '../../components/user-bar';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../../components/user-info';

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {
  const navigate = useNavigate()
  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.login.autoLogin();
    if (!select.isAuth) {
      navigate('/login')
    }
  }, [], true);

  const select = useSelector(state => ({
    user: state.login.user,
    isAuth: state.login.isAuth
  }));

  const callbacks = {
    navigateToLogin: () => navigate('/login'),
    logOut: useCallback(() => {
      store.actions.login.logOut()
      navigate('/')
    }, [store])
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserBar isAuth={select.isAuth} logOut={callbacks.logOut} user={select.user.profile?.name} navigate={callbacks.navigateToLogin} t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserInfo t={t} user={select.user} />
    </PageLayout>
  );
}

export default memo(Profile);