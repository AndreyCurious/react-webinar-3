import { memo, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions'
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import AllComments from '../../components/all-comments';
import { useState } from 'react';
import listToTree from '../../utils/list-to-tree';
import TreeComments from '../../components/tree-comments';
import CommentForm from '../../components/comment-form';


function ArticleComments() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const countNesting = 0;
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    formLocation: state.comments.formLocation,
    currentComment: state.comments.currentComment,
  }), shallowequal);
  const select = useSelector((state) => ({
    exists: state.session.exists,
    userId: state.session.user._id
  }))

  const { t } = useTranslate();
  const options = {
    comments: useMemo(() => ([
      ...listToTree([{ _id: params.id, parent: null }, ...selectRedux.comments])
    ]))
  }
  const currentId = selectRedux.currentComment === '' ? params.id : selectRedux.currentComment
  const callbacks = {
    sendComment: () => dispatch(commentsActions.sendComments(comment, currentId, selectRedux.formLocation)),
    changeFormLocation: (nameLocation, idComment) => dispatch(commentsActions.changeFormLocation(nameLocation, idComment)),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

  }

  const formData = {
    formLocation: selectRedux.formLocation,
    changeFormLocation: callbacks.changeFormLocation,
    sendComment: callbacks.sendComment,
  }
  const commentsData = {
    currentComment: selectRedux.currentComment,
    comments: options.comments[0].children,
    comment: comment,
    setComment: setComment,
    countNesting: countNesting,
  }

  return (
    <TreeComments countComments={selectRedux.comments.length} t={t}>
      <AllComments
        t={t}
        formData={formData}
        commentsData={commentsData}
        currentUser={select.userId}
      >
        <CommentForm
          t={t}
          formData={formData}
          commentsData={commentsData}
          exists={select.exists}
          onSignIn={callbacks.onSignIn}
        />
      </AllComments>
      {selectRedux.formLocation === 'article' ?
        <CommentForm
          t={t}
          formData={formData}
          commentsData={commentsData}
          exists={select.exists}
          onSignIn={callbacks.onSignIn}
        />
        :
        <></>
      }

    </TreeComments>
  );
}

export default memo(ArticleComments);

