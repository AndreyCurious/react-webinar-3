export const initialState = {
  comments: [],
  waiting: false,
  formLocation: 'article',
  currentProduct: '',
  currentComment: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: [], waiting: true, currentProduct: action.payload.currentProduct, formLocation: 'article' };

    case "comments/load-success":
      return { ...state, comments: action.payload.comments, waiting: false };

    case "comments/send-comments-start":
      return { ...state, waiting: true };

    case "comments/send-comments-success":
      return { ...state, comments: [...state.comments, action.payload.newComment], waiting: false, currentComment: '', formLocation: 'article' };

    case "comments/change-from-location":
      return { ...state, formLocation: action.payload.formLocation, currentComment: action.payload.currentComment }

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
