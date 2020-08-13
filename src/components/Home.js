import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paginator from './pagination/Paginator';
import Articles from './articles/Articles';
import Loader from './Loader';
import { getArticles } from '../redux/actions/articles.action';

class Home extends Component {
  componentDidMount() {
    const { getArticlesTitles } = this.props;
    getArticlesTitles();
  }

  componentDidUpdate(prevProps) {
    const { getArticlesTitles, currentPage } = this.props;
    if (currentPage !== prevProps.currentPage) {
      getArticlesTitles();
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { articles, isLoading } = this.props;
    const loader = (
      <div className='row'>
        <div className='col s6 offset-s3'>
          <div className='center-align'>
            <Loader />
          </div>
        </div>
      </div>
    );
    return (
      <>
        {isLoading && loader}
        {articles.length > 0 ? (
          <div className='row'>
            <div className='col s6 offset-s3'>
              <Articles />
              <div className='center-align'>
                <Paginator />
              </div>
            </div>
          </div>
        ) : (
          <div className='row'>
            <div className='col s4 offset-s4'>
              <div className='center-align'>Статей пока нет</div>
            </div>
          </div>
        )}
      </>
    );
  }
}

Home.defaultProps = {
  articles: {},
  isLoading: false,
  currentPage: 1,
};

Home.propTypes = {
  articles: PropTypes.instanceOf(Object),
  getArticlesTitles: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  currentPage: PropTypes.number,
};
const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  isLoading: state.loader.loading,
  currentPage: state.paginator.activePage,
});
const mapDispatchToProps = (dispatch) => ({
  getArticlesTitles: () => dispatch(getArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
