import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ru } from 'date-fns/locale';
import { withRouter } from 'react-router-dom';
import {
  changeFavorite,
  deleteArticle,
  onEditingArticle,
  setArticleToState,
} from '../../redux/actions/articles.action';

const ViewArticle = ({
  modifyFavorite,
  location,
  articles,
  deleteCuttentArticle,
  history,
  enableEditing,
  stateForEdit,
}) => {
  const {
    slug,
    title,
    description,
    body,
    tagList,
    createdAt,
    updatedAt,
    favorited,
    author,
  } = location.state;
  const { username, bio, image, following } = author;
  const [currentArticle] = articles.filter((item) => item.slug === slug);

  const changeFavoritHandler = (aim) => (event) => {
    event.preventDefault();
    modifyFavorite(slug, aim);
  };

  const deleteHandler = () => {
    deleteCuttentArticle(slug);
    history.push('/');
  };

  const goToUpdateButtonClick = () => {
    enableEditing();
    stateForEdit(currentArticle);
    history.push(`/articles/${slug}/edit`);
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2 orange lighten-5 pad2'>
        <div className='center-align'>
          <h3>{`Название статьи: ${title}`}</h3>
          <span>{`Описание статьи: ${description}`}</span>
          <p>{`Содержание: ${body}`}</p>
          <p>{`Тэги: ${tagList}`}</p>
          <p>{`Дата создания: ${format(new Date(createdAt), 'dd MMMM yyyy', {
            locale: ru,
          })}`}</p>
          <p>{`Дата обновления: ${format(new Date(updatedAt), 'HH:mm dd MMMM yyyy', {
            locale: ru,
          })}`}</p>
          <p>{`Любимая статья? ${favorited}`}</p>
          <div className='row'>
            <div className='col s4 offset-s4 margin--top'>
              <div className='center-align'>
                <a href='#!' className='article__icons' onClick={changeFavoritHandler('add')}>
                  <i className='material-icons left'>plus_one</i>
                </a>
                <span
                  className='new badge orange left'
                  data-badge-caption=''
                >{`Количество лайков: ${currentArticle.favoritesCount}`}</span>
                <a href='#!' className='article__icons' onClick={changeFavoritHandler('delete')}>
                  <i className='material-icons left ml4'>delete</i>
                </a>
              </div>
            </div>
          </div>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <img src={image} alt='Картинка' className='article__image' />
              <span className='card-title'>{`Автор: ${username}`}</span>
              <p>{`Биография: ${bio}`}</p>
              <p>{`Не знаю что за свойство: ${following}`}</p>
            </div>
          </div>
          <div>
            <button
              className='btn waves-effect waves-light light-blue darken-3 button__margin--right'
              type='button'
              name='action'
              onClick={goToUpdateButtonClick}
            >
              Редактировать
              <i className='material-icons right'>edit</i>
            </button>
            <button
              className='btn waves-effect waves-light deep-orange darken-3'
              type='button'
              name='action'
              onClick={deleteHandler}
            >
              Удалить
              <i className='material-icons right'>delete_forever</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewArticle.defaultProps = {
  location: {},
  history: {},
};

ViewArticle.propTypes = {
  location: PropTypes.instanceOf(Object),
  articles: PropTypes.instanceOf(Array).isRequired,
  modifyFavorite: PropTypes.func.isRequired,
  deleteCuttentArticle: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object),
  enableEditing: PropTypes.func.isRequired,
  stateForEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
});

const mapDispatchToProps = (dispatch) => ({
  modifyFavorite: (articleSlug, aim) => dispatch(changeFavorite(articleSlug, aim)),
  deleteCuttentArticle: (articleSlug) => dispatch(deleteArticle(articleSlug)),
  enableEditing: () => dispatch(onEditingArticle()),
  stateForEdit: (article) => dispatch(setArticleToState(article)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewArticle));
