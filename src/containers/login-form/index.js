import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Input from '../../components/input';
import ButtonSubmit from '../../components/button-submit';
import Error from '../../components/error';
import Form from "../../components/form";

function LoginForm() {
  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.login.autoLogin();
  }, [], true);

  const { t } = useTranslate();

  const select = useSelector(state => ({
    login: state.login.login,
    password: state.login.password,
    error: state.login.error,
    isLoad: state.login.isLoad
  }));

  const callbacks = {
    onSubmit: useCallback((e) => store.actions.login.onSubmit(e), [store]),
    handleChange: useCallback((value, name) => store.actions.login.handleChange(value, name), [store]),
  }

  return (
    <Form onSubmit={callbacks.onSubmit}>
      <h1>{t('login')}</h1>
      <Input label={t('login.input')} value={select.login} onChange={callbacks.handleChange} type={"text"} name={'login'} />
      <Input label={t('password')} type="password" value={select.password} onChange={callbacks.handleChange} name={'password'} />
      <Error error={select.error} />
      <ButtonSubmit titleButton={t('enter')} isLoad={select.isLoad} />
    </Form>
  );
}

export default memo(LoginForm);