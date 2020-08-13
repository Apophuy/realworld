import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Article from './Article';

const Articles = ({ articles }) => {
  return (
    <ul className='collection'>
      {articles.map((article) => (
        <Link key={article.slug} to={{ pathname: `/articles/${article.slug}`, state: article }}>
          <Article article={article} />
        </Link>
      ))}
    </ul>
  );
};
Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};
const mapStateToProps = (state) => ({
  articles: state.articles.articles,
});
export default connect(mapStateToProps)(Articles);
