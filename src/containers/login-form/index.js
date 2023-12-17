import { memo, useCallback, useState } from 'react';
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
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useInit(() => {
    store.actions.sessionState.autoLogin();
  }, [], true);

  const { t } = useTranslate();

  const select = useSelector(state => ({
    error: state.sessionState.error,
    isLoad: state.sessionState.isLoad
  }));
  const callbacks = {
    onSubmit: (e) => store.actions.sessionState.onSubmit(e, login, password),
    handleChange: useCallback((value, name) => store.actions.form.handleChange(value, name), [store]),
  }

  return (
    <Form onSubmit={callbacks.onSubmit}>
      <h1>{t('login')}</h1>
      <Input label={t('login.input')} value={login} onChange={setLogin} type={"text"} name={'login'} />
      <Input label={t('password')} type="password" value={password} onChange={setPassword} name={'password'} />
      <Error error={select.error} />
      <ButtonSubmit titleButton={t('enter')} isLoad={select.isLoad} />
    </Form>
  );
}

export default memo(LoginForm);