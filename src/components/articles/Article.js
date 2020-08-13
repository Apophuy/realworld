import React from 'react';
import PropTypes from 'prop-types';
import { parseJSON, differenceInMilliseconds, format } from 'date-fns';

const Article = ({ article }) => {
  const { createdAt } = article;
  const diffInMs = differenceInMilliseconds(Date.now(), parseJSON(createdAt));
  const passedTimeSinceCreation = format(diffInMs, 'dd дней hh часов mm минут');

  return (
    <li className='collection-item avatar margin--bottom'>
      <img src={article.author.image} alt={article.author.username} className='circle' />
      <span className='title'>
        Название:&nbsp;<b>{article.title}</b>
      </span>
      <p>
        Автор:&nbsp;<b>{article.author.username}</b>
      </p>
      <p>{`Создана: ${passedTimeSinceCreation} назад`}</p>
      <span>
        Теги:&nbsp;
        {article.tagList.map((tag) => (
          <span key={tag}>{`${tag} `}</span>
        ))}
      </span>
      <div className='row s4 offset-s4 margin--top'>
        <span
          className='new badge orange left'
          data-badge-caption=''
        >{`Количество лайков: ${article.favoritesCount}`}</span>
      </div>
    </li>
  );
};

Article.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
};

export default Article;
