import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import formReducer from './form.reducer';
import articlesReducer from './articles.reducer';
import loaderReducer from './loader.reducer';
import paginatorReducer from './paginator.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  articles: articlesReducer,
  loader: loaderReducer,
  paginator: paginatorReducer,
});

export default rootReducer;
