import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  filter: [],
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_TAG:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};


export default PostsReducer;
