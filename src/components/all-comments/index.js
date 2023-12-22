import { memo } from 'react';
import PropTypes from 'prop-types';
import Comment from '../comment';
import './style.css';

function AllComments({ formData, commentsData, children, currentUser, t }) {
  const { comments } = commentsData;
  return (
    comments.map((item) => (
      <div key={item._id}>
        <Comment t={t} formData={formData} commentsData={commentsData} currentUser={currentUser} comment={item} children={children} />
      </div>
    ))
  )
}

AllComments.propTypes = {
  formData: PropTypes.object,
  commentsData: PropTypes.shape({
    commens: PropTypes.array
  }),
  children: PropTypes.node,
  currentUser: PropTypes.string,
  t: PropTypes.func
};

AllComments.defaultProps = {
  commentsData: {
    comments: []
  },
  currentUser: ''

}

export default memo(AllComments);