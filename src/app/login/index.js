import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../containers/login-form';
import UserBar from '../../components/user-bar';
import { useNavigate } from 'react-router-dom';

function Login() {
  const store = useStore();
  const navigate = useNavigate()


  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.login.autoLogin();
  }, [], true);

  const { t } = useTranslate();

  const select = useSelector(state => ({
    login: state.login.login,
    password: state.login.password,
    error: state.login.error,
    user: state.login.user,
    isAuth: state.login.isAuth,
    isLoad: state.login.isLoad
  }));

  const callbacks = {
    navigateToLogin: () => navigate('/login'),
    logOut: useCallback(() => store.actions.login.logOut(), [store])
  }

  return (
    <PageLayout>
      <UserBar isAuth={select.isAuth} logOut={callbacks.logOut} user={select.user.profile?.name} navigate={callbacks.navigateToLogin} t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Login);