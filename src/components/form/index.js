import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Form({ children, onSubmit }) {
  return (
    <form className="Login-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(Form);
