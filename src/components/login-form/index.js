import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function LoginForm(props) {
  return (
    <form className="Login-form" onSubmit={props.onSubmit}>
      <h1>{props.t('login')}</h1>
      <div className="Login-form-labels">
        <label className="Login-form-label">
          {props.t('login.input')}
          <input type="text" value={props.login} onChange={props.handleChangeLogin} />
        </label>
        <label className="Login-form-label">
          {props.t('password')}
          <input type="password" value={props.password} onChange={props.handleChangePassword} />
        </label>
      </div>
      {props.error ?
        <div className="Login-form-error">
          {props.error}
        </div>
        :
        <></>
      }
      <input disabled={props.isLoad} type="submit" value={props.t('enter')} />
    </form>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  login: PropTypes.string,
  handleChangeLogin: PropTypes.func,
  handleChangePassword: PropTypes.func,
  password: PropTypes.string,
  error: PropTypes.string,
  isLoad: PropTypes.bool
};

LoginForm.defaultProps = {
  t: (text) => text
}

export default memo(LoginForm);
