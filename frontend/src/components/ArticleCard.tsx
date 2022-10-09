import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

export interface ArticleCardProps {
  id: string;
  title: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
}): JSX.Element => {
  return (
    <Link to={`/articles/${id}`} className="article-card__link">
      <div className="article-card__container">
        <article key={id}>
          <h3>{title}</h3>
          <p>Click to read</p>
        </article>
      </div>
    </Link>
  );
};

export default ArticleCard;
