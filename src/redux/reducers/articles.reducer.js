import {
  GET_ARTICLES,
  CHANGE_OFFSET,
  CHANGE_FAVORITE,
  CHANGE_ARTICLE_FIELD,
  PUBLISH_ARTICLE,
  DELETE_ARTICLE,
  ON_EDITING_ARTICLE,
  OFF_EDITING_ARTICLE,
  UPDATE_ARTICLE,
  SET_ARTICLE_TO_STATE,
  CLEAR_EDITING_ARTICLE,
} from '../constants/actionTypes';

const initialState = {
  articles: [],
  articlesCount: 0,
  articlesLimit: 10,
  articlesOffset: 0,
  editingArticle: {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
  editing: false,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case CHANGE_OFFSET:
      return {
        ...state,
        articlesOffset: action.payload,
      };
    case CHANGE_FAVORITE:
      return {
        ...state,
        articles: action.payload,
      };
    case CHANGE_ARTICLE_FIELD:
      return {
        ...state,
        editingArticle: {
          ...state.editingArticle,
          [action.payload.field]: action.payload.value,
        },
      };
    case PUBLISH_ARTICLE:
      return {
        ...state,
        articles: action.payload,
        editingArticle: {
          ...initialState.editingArticle,
        },
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    case ON_EDITING_ARTICLE:
      return {
        ...state,
        editing: true,
      };
    case OFF_EDITING_ARTICLE:
      return {
        ...state,
        editing: false,
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        articles: action.payload,
        editingArticle: {
          ...initialState.editingArticle,
        },
      };
    case SET_ARTICLE_TO_STATE:
      return {
        ...state,
        editingArticle: action.payload,
      };
    case CLEAR_EDITING_ARTICLE:
      return {
        ...state,
        editingArticle: initialState.editingArticle,
      };
    default:
      return state;
  }
};

export default articlesReducer;
