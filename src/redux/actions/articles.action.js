import { unionBy } from 'lodash';
import { API_ROOT } from './auth.action';
import PopupMessage from '../../components/PopupMessage';
import {
  GET_ARTICLES,
  CHANGE_OFFSET,
  CHANGE_FAVORITE,
  CHANGE_ARTICLE_FIELD,
  PUBLISH_ARTICLE,
  DELETE_ARTICLE,
  ON_EDITING_ARTICLE,
  OFF_EDITING_ARTICLE,
  SET_ARTICLE_TO_STATE,
  UPDATE_ARTICLE,
  CLEAR_EDITING_ARTICLE,
} from '../constants/actionTypes';
import { showLoader, hideLoader } from './loader.action';

let articlesUrl = '';

const getArticlesUrl = (func) => {
  const { articles } = func();
  const { articlesLimit, articlesOffset } = articles;
  articlesUrl = `${API_ROOT}/articles?limit=${articlesLimit}&offset=${articlesOffset}`;
};

export const getArticles = () => async (dispatch, getState) => {
  try {
    getArticlesUrl(getState);
    dispatch(showLoader());
    const request = await fetch(articlesUrl);
    const json = await request.json();
    dispatch({
      type: GET_ARTICLES,
      payload: json,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    PopupMessage(error.message);
  }
};

export const changeOffset = (pageNumber) => (dispatch, getState) => {
  const { articles, paginator } = getState();
  const { paginationLength } = paginator;
  const { articlesLimit } = articles;
  const offset = pageNumber * articlesLimit - paginationLength;
  dispatch({
    type: CHANGE_OFFSET,
    payload: offset,
  });
};

const getArticleUrl = (articleSlug) => {
  return `${API_ROOT}/articles/${articleSlug}/favorite`;
};

const getToken = () => {
  const userJson = localStorage.getItem('user');
  const currentUser = JSON.parse(userJson);
  const { token } = currentUser;
  return token;
};

export const changeFavorite = (articleSlug, aim) => async (dispatch, getState) => {
  try {
    const { articles } = getState();
    const url = getArticleUrl(articleSlug);
    const token = getToken();
    let request;
    if (aim === 'add') {
      request = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } else {
      request = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    }
    const status = await request.status;
    if (status === 200) {
      const json = await request.json();
      const newArticle = json.article;
      const newArticles = unionBy([newArticle], articles.articles, 'slug');
      dispatch({
        type: CHANGE_FAVORITE,
        payload: newArticles,
      });
    }
  } catch (error) {
    PopupMessage(error.message);
  }
};

export const changeFormField = (field, value) => ({
  type: CHANGE_ARTICLE_FIELD,
  payload: {
    field,
    value,
  },
});

export const publishArticle = (article) => async (dispatch, getState) => {
  try {
    const { articles } = getState();
    const token = getToken();
    const request = await fetch(`${API_ROOT}/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ article }),
    });
    const status = await request.status;
    if (status === 200) {
      const json = await request.json();
      const newArticle = json.article;
      const newArticles = [newArticle].concat(articles.articles);
      dispatch({
        type: PUBLISH_ARTICLE,
        payload: newArticles,
      });
      PopupMessage('Статья опубликована');
    }
  } catch (error) {
    PopupMessage(error.message);
  }
};

export const deleteArticle = (slug) => async (dispatch, getState) => {
  try {
    const { articles } = getState();
    const token = getToken();
    const url = `${API_ROOT}/articles/${slug}`;
    const request = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const status = await request.status;
    if (status === 200) {
      const updatedArticles = articles.articles.filter((article) => article.slug !== slug);
      dispatch({
        type: DELETE_ARTICLE,
        payload: updatedArticles,
      });
      PopupMessage('Статья удалена');
    }
    if (status === 403) {
      PopupMessage('Не твоя статья, не лезь куда не следует');
    }
  } catch (error) {
    PopupMessage(error.message);
  }
};

export const onEditingArticle = () => ({
  type: ON_EDITING_ARTICLE,
});

export const offEditingArticle = () => ({
  type: OFF_EDITING_ARTICLE,
});

export const clearEditingArticle = () => ({
  type: CLEAR_EDITING_ARTICLE,
});

export const updateArticle = (article) => async (dispatch, getState) => {
  try {
    const { articles } = getState();
    const { slug } = article;
    const url = `${API_ROOT}/articles/${slug}`;
    const token = getToken();
    const request = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ article }),
    });
    const status = await request.status;
    if (status === 403) {
      PopupMessage('Нельзя пытаться редактировать чужую статью');
      dispatch(clearEditingArticle());
    }
    if (status === 200) {
      const json = await request.json();
      const newArticle = json.article;
      const cropArticles = articles.articles.filter((item) => item.slug !== slug);
      const updatedArticles = [newArticle].concat(cropArticles);
      dispatch({
        type: UPDATE_ARTICLE,
        payload: updatedArticles,
      });
    }
  } catch (error) {
    dispatch(offEditingArticle());
    PopupMessage(error.message);
  }
};

export const setArticleToState = (article) => ({
  type: SET_ARTICLE_TO_STATE,
  payload: article,
});
