import { memo } from 'react';
import PropTypes from 'prop-types';
import Comment from '../comment';
import './style.css';

function AllComments({ comments, changeFormLocation, formLocation, currentComment, children, currentUser, t }) {
  return (
    comments.map((item) => (
      <div key={item._id}>
        <Comment t={t} currentUser={currentUser} currentComment={currentComment} formLocation={formLocation} changeFormLocation={changeFormLocation} comment={item} children={children} />
      </div>

    ))
  )
}

AllComments.propTypes = {
  comments: PropTypes.array,
  changeFormLocation: PropTypes.func,
  formLocation: PropTypes.string,
  currentComment: PropTypes.string,
  children: PropTypes.node,
  currentUser: PropTypes.string,
  t: PropTypes.func
};

export default memo(AllComments);