import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  changeFormField,
  publishArticle,
  offEditingArticle,
  updateArticle,
} from '../../redux/actions/articles.action';
import PopupMessage from '../PopupMessage';

class EditArticle extends Component {
  componentDidMount() {
    if (window.M) {
      window.M.updateTextFields();
    }
  }

  changeFieldHandler = (event) => {
    const { value, name } = event.target;
    const { changeField } = this.props;
    if (name === 'tagList') {
      const regexp = /^[\d a-zа-яё]+$/gi;
      if (!regexp.test(value) && value.length !== 0) {
        PopupMessage('Желательно использовать только пробелы для разделения тэгов');
      }
      const arr = value.split(' ');
      changeField(name, arr);
    } else {
      changeField(name, value);
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    const {
      editArticle,
      submitHandler,
      article,
      history,
      disableEditing,
      uploadUpdatedArticle,
    } = this.props;
    if (!editArticle) {
      submitHandler(article);
      history.push('/');
    } else {
      uploadUpdatedArticle(article);
      disableEditing();
      history.push('/');
    }
  };

  render() {
    const { editArticle, article } = this.props;
    const { title, description, body, tagList } = article;
    return (
      <div className='row'>
        <div className='col s8 offset-s2 orange lighten-5 pad2'>
          <div className='center-align'>
            <h3>{editArticle ? 'Редактировать статью' : 'Создать статью'}</h3>
            <form onSubmit={this.submitHandler}>
              <div className='input-field'>
                <i className='material-icons prefix'>title</i>
                <input
                  placeholder='Введите название статьи'
                  id='article_title'
                  type='text'
                  className='validate'
                  name='title'
                  onChange={this.changeFieldHandler}
                  defaultValue={editArticle ? title : ''}
                />
                <label htmlFor='article_title'>Название статьи</label>
              </div>
              <div className='input-field'>
                <i className='material-icons prefix'>description</i>
                <input
                  placeholder='Введите описание статьи'
                  id='article_description'
                  type='text'
                  className='validate'
                  name='description'
                  onChange={this.changeFieldHandler}
                  defaultValue={editArticle ? description : ''}
                />
                <label htmlFor='article_description'>Описание статьи</label>
              </div>
              <div className='input-field'>
                <i className='material-icons prefix'>mode_edit</i>
                <textarea
                  id='article_body'
                  className='materialize-textarea'
                  name='body'
                  onChange={this.changeFieldHandler}
                  defaultValue={editArticle ? body : ''}
                />
                <label htmlFor='article_body'>Текст статьи</label>
              </div>
              <div className='input-field'>
                <i className='material-icons prefix'>tag_faces</i>
                <input
                  placeholder='Введите тэги для статьи'
                  id='article_tagList'
                  type='text'
                  className='validate'
                  name='tagList'
                  onChange={this.changeFieldHandler}
                  defaultValue={editArticle ? tagList.join(' ') : ''}
                />
                <label htmlFor='article_tagList'>Тэги статьи</label>
              </div>
              <button
                className='btn waves-effect waves-light btn-large deep-orange darken-3 margin--bottom'
                type='submit'
              >
                <i className='material-icons left'>cloud_upload</i>
                <b>{editArticle ? 'Исправить' : 'Опубликовать'}</b>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditArticle.defaultProps = {
  history: {},
};

EditArticle.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  changeField: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  editArticle: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object),
  disableEditing: PropTypes.func.isRequired,
  uploadUpdatedArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.articles.editingArticle,
  editArticle: state.articles.editing,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (field, value) => dispatch(changeFormField(field, value)),
  submitHandler: (article) => dispatch(publishArticle(article)),
  disableEditing: () => dispatch(offEditingArticle()),
  uploadUpdatedArticle: (article) => dispatch(updateArticle(article)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditArticle));
