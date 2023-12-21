import { memo } from 'react';
import AllComments from '../all-comments';
import PropTypes from 'prop-types';
import dateFormat from '../../utils/date-format';
import './style.css';

function Comment({ comment, changeFormLocation, formLocation, currentComment, children, currentUser, t }) {
  const callbacks = {
    changeFormLocation: () => changeFormLocation('comment', comment._id)
  }
  return (
    <ul>
      <li>
        <div>
          <div className='Comment-user'>
            {currentUser === comment.author._id ?
              <span className='Comment-currentuser-name'>{comment.author?.profile.name}</span>
              :
              <span className='Comment-user-name'>{comment.author?.profile.name}</span>
            }

            <span className='Comment-user-date'>{dateFormat(comment.dateCreate, t)}</span>
          </div>
          <div className='Comment-text'>{comment.text}</div>
          <button className='Comment-send' onClick={callbacks.changeFormLocation}>{t('comment.answer')}</button>
        </div>
        {currentUser ?
          <>
            <AllComments t={t} currentUser={currentUser} currentComment={currentComment} formLocation={formLocation} comments={comment.children} changeFormLocation={changeFormLocation}>
              {children}
            </AllComments>
            {formLocation === 'comment' && currentComment === comment._id ?
              [children]
              :
              <></>
            }
          </>
          :
          <>
            {formLocation === 'comment' && currentComment === comment._id ?
              [children]
              :
              <></>
            }
            <AllComments t={t} currentUser={currentUser} currentComment={currentComment} formLocation={formLocation} comments={comment.children} changeFormLocation={changeFormLocation}>
              {children}
            </AllComments>
          </>

        }


      </li>
    </ul >
  )
}

Comment.propTypes = {
  comments: PropTypes.array,
  changeFormLocation: PropTypes.func,
  formLocation: PropTypes.string,
  currentComment: PropTypes.string,
  children: PropTypes.node,
  currentUser: PropTypes.string,
  t: PropTypes.func
};

export default memo(Comment);