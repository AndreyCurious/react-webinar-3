import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";

import './style.css';

function UserInfo({ user, t }) {
  const cn = bem('User');
  return (
    <div className={cn()}>
      <h1>{t('profile')}</h1>
      <div className={cn('field')}>
        <span className={cn('title')}>
          {t('user.name')}
        </span>
        <span className={cn('info')}>
          {user.profile.name}
        </span>
      </div>
      <div className={cn('field')}>
        <span className={cn('title')}>
          {t('user.phone')}
        </span>
        <span className={cn('info')}>
          {user.profile.phone}
        </span>
      </div>
      <div className={cn('field')}>
        <span className={cn('title')}>
          {t('user.email')}
        </span>
        <span className={cn('info')}>
          {user.email}
        </span>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  t: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
    prfile: PropTypes.shape({
      phone: PropTypes.string,
      name: PropTypes.string
    })
  })
}
UserInfo.defaultProps = {
  t: (text) => text
}

export default memo(UserInfo);