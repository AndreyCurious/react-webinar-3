import { memo } from 'react';
import Input from '../input';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function CommentForm({ formData, commentsData, exists, t }) {
  const { changeFormLocation, formLocation, sendComment } = formData;
  const { comment, setComment } = commentsData;
  const callbacks = {
    changeFormLocation: () => changeFormLocation('article', '')
  }
  if (formLocation === 'article') {
    return !exists ?
      <div className='Comment-form-link Article-link'>
        {<Link className='link' to={'/login'}>{t('comment.login')}</Link>}{t('comment.opportunity')}
      </div>
      :
      <div className='Comment-form Form-article'>
        <span className='Comment-form-title'>{t('comment.newcomment')}</span>
        <Input theme='Comment-form-input' type='textarea' placeholder={t('comment.text')} value={comment} onChange={setComment} />
        <button disabled={comment.length === 0} className='Comment-from-button-article' onClick={sendComment}>{t('comment.send')}</button>
      </div>
  }

  if (formLocation === 'comment') {
    return !exists ?
      <div className='Comment-form-link Comment-link'>
        {<Link className='link-comment' to={'/login'}>{t('comment.login')}</Link>}{t('comment.opportunitycomment')}{<button onClick={callbacks.changeFormLocation} className='Comment-cancel'>{t('comment.cancel')}</button>}
      </div>
      :
      <div className='Comment-form Form-comment'>
        <span className='Comment-form-title'>{t('comment.newanswer')}</span>
        <Input theme='Comment-form-input' type='textarea' placeholder={t('comment.text')} value={comment} onChange={setComment} />
        <div>
          <button disabled={comment.length === 0} className='Comment-form-button-comment' onClick={sendComment}>{t('comment.send')}</button>
          <button className='Comment-form-button-comment' onClick={callbacks.changeFormLocation}>{t('comment.cancel')}</button>
        </div>
      </div>
  }
}

CommentForm.propTypes = {
  formData: PropTypes.shape({
    sendComment: PropTypes.func,
    changeFormLocation: PropTypes.func,
    formLocation: PropTypes.string
  }),
  commentsData: PropTypes.shape({
    setComment: PropTypes.func,
    comment: PropTypes.string,
  }),
  exists: PropTypes.bool,
  t: PropTypes.func
};

CommentForm.defaultProps = {
  commentsData: {
    setComment: () => { },
    comment: ''
  },
  formData: {
    changeFormLocation: () => { },
    sendComment: () => { },
    formLocation: 'article',
  }
}

export default memo(CommentForm);