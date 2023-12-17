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

  const { t } = useTranslate();

  const select = useSelector(state => ({
    error: state.sessionState.error,
    user: state.sessionState.user,
    isAuth: state.sessionState.isAuth,
    isLoad: state.sessionState.isLoad
  }));

  const callbacks = {
    navigateToLogin: () => navigate('/login'),
    logOut: useCallback(() => store.actions.sessionState.logOut(), [store])
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