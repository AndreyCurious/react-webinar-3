import { memo, useEffect, useRef } from 'react';
import AllComments from '../all-comments';
import PropTypes from 'prop-types';
import dateFormat from '../../utils/date-format';
import './style.css';

function Comment({ formData, commentsData, comment, children, currentUser, t }) {
  const { changeFormLocation, formLocation } = formData;
  const { currentComment, countNesting } = commentsData;
  const ref = useRef(null)
  const callbacks = {
    changeFormLocation: () => changeFormLocation('comment', comment._id)
  }
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start"
      })
    }
  }, [currentComment])

  return (
    <ul className={countNesting > 16 ? 'Comment-nasting Comment-ul' : 'Comment-ul'}>
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
          <button onClick={callbacks.changeFormLocation} className='Comment-send' >{t('comment.answer')}</button>
        </div>
        {currentUser ?
          <>
            <AllComments formData={formData} commentsData={{ ...commentsData, comments: comment.children, countNesting: comment.children === 0 ? 0 : countNesting + 1 }} t={t} currentUser={currentUser}>
              {children}
            </AllComments>
            {formLocation === 'comment' && currentComment === comment._id ?
              <div ref={ref}>
                {[children]}
              </div>
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
            <AllComments formData={formData} commentsData={{ ...commentsData, comments: comment.children, countNesting: comment.children === 0 ? 0 : countNesting + 1 }} t={t} currentUser={currentUser}>
              {children}
            </AllComments>
          </>
        }
      </li>
    </ul >
  )
}

Comment.propTypes = {
  formData: PropTypes.shape({
    changeFormLocation: PropTypes.func,
    formLocation: PropTypes.string,
  }),
  commentsData: PropTypes.shape({
    currentComment: PropTypes.string,
  }),
  comment: PropTypes.shape({
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    text: PropTypes.string,
  }),
  children: PropTypes.node,
  currentUser: PropTypes.string,
  t: PropTypes.func
};

Comment.defaultProps = {
  formData: {
    changeFormLocation: () => { },
    formLocation: '',
  },
  commentsData: {
    currentComment: ''
  }

}

export default memo(Comment);