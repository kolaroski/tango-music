import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import articles_data from '../articles_data';
import ArticlesContainer from '../containers/ArticleContainer';
import '../components/Articles.css';

const AllArticles: React.FC = (): JSX.Element => {
  return (
    <>
      {/* Show card list of articles */}
      <div className="all-articles__container">
        {articles_data.map(article => {
          return (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllArticles;
