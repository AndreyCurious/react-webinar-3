import { memo } from 'react';
import AllComments from '../all-comments';
import PropTypes from 'prop-types';
import './style.css';

function TreeComments({ children, countComments, t }) {
  return (
    <div className='TreeComments'>
      <span className='TreeComments-count'>{`${t('comment.comments')} (${countComments})`}</span>
      {children}
    </div>
  )
}

TreeComments.propTypes = {
  children: PropTypes.node,
  countComments: PropTypes.number
};

export default memo(TreeComments);