import React from 'react';
import { Link } from 'react-router-dom';
import articles_data from '../articles_data';

const Articles: React.FC = (): JSX.Element => {
  return (
    <>
      {/* Show card list of articles */}
      <div>
        {articles_data.map(article => {
          return (
            <article key={article.id}>
              <h3>{article.title}</h3>
              <Link to={`/articles/${article.id}`}>Click to read...</Link>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Articles;
