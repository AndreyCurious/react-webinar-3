import { memo, useCallback, useEffect } from 'react';
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


function Profile() {
  const navigate = useNavigate()
  const store = useStore();

  useInit(() => {
    store.actions.profile.fetchUser();
  }, [], true)

  const select = useSelector(state => ({
    user: state.profile.user,
    isAuth: state.sessionState.isAuth
  }));

  const callbacks = {
    navigateToLogin: () => navigate('/login'),
    logOut: useCallback(() => {
      store.actions.sessionState.logOut()
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