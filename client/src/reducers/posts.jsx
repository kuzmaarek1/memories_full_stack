import {
  FETCH_ALL,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_BY_CREATOR,
} from '@/constants/actionTypes'

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_POST:
      return { ...state, post: action.payload.post }
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, posts: action.payload }
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }
          return post
        }),
        // post: { ...state.post, comments: action.payload.comments },
      }
    default:
      return state
  }
}
