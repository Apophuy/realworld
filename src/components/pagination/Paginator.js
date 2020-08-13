import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import { connect } from 'react-redux';
import Page from './Page';
import { changeActivePage, changeFirstPage } from '../../redux/actions/paginator.action';
import { changeOffset } from '../../redux/actions/articles.action';

const Paginator = ({
  state,
  articlesCount,
  articlesLimit,
  changePage,
  changeArticlesList,
  changePaginatorList,
}) => {
  const { firstPage, activePage, paginationLength } = state;
  const pagesRange = range(firstPage, firstPage + paginationLength);

  const changePagesRange = (dir) => (event) => {
    event.preventDefault();
    if (dir === 'more') {
      if (pagesRange[paginationLength - 1] === Math.ceil(articlesCount / articlesLimit)) {
        return;
      }
      const newFirstPage = firstPage + paginationLength;
      changePaginatorList(newFirstPage);
      changePage(newFirstPage);
      changeArticlesList(newFirstPage);
    } else {
      if (firstPage === 1) {
        return;
      }
      const newFirstPage = firstPage - paginationLength;
      changePaginatorList(newFirstPage);
      changePage(newFirstPage);
      changeArticlesList(newFirstPage);
    }
  };
  const changePageHandler = (pageNumber) => {
    changePage(pageNumber);
    changeArticlesList(pageNumber);
  };
  return (
    <ul className='pagination'>
      <li className={firstPage === 1 ? 'disabled' : 'waves-effect'}>
        <a href='#!' onClick={changePagesRange('less')}>
          <i className='material-icons'>chevron_left</i>
        </a>
      </li>
      {pagesRange.map((page) => (
        <Page
          key={page}
          pageNumber={page}
          isActive={page === activePage}
          changePageHandler={changePageHandler}
        />
      ))}
      <li
        className={
          pagesRange[paginationLength - 1] === Math.ceil(articlesCount / articlesLimit)
            ? 'disabled'
            : 'waves-effect'
        }
      >
        <a href='#!' onClick={changePagesRange('more')}>
          <i className='material-icons'>chevron_right</i>
        </a>
      </li>
    </ul>
  );
};
Paginator.defaultProps = {
  state: {},
};

Paginator.propTypes = {
  state: PropTypes.instanceOf(Object),
  articlesCount: PropTypes.number.isRequired,
  articlesLimit: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  changeArticlesList: PropTypes.func.isRequired,
  changePaginatorList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  state: state.paginator,
  articlesCount: state.articles.articlesCount,
  articlesLimit: state.articles.articlesLimit,
});
const mapDispatchToProps = (dispatch) => ({
  changePage: (pageNumber) => dispatch(changeActivePage(pageNumber)),
  changeArticlesList: (pageNumber) => dispatch(changeOffset(pageNumber)),
  changePaginatorList: (next) => dispatch(changeFirstPage(next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
