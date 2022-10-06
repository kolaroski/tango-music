import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import articles_data from '../articles_data';
import parse from 'html-react-parser';
import * as createPurify from 'dompurify';
import '../components/Articles.css';

const SingleArticle: React.FC = (): JSX.Element => {
  const { articleId } = useParams();
  const article = articles_data.find(article => article.id === articleId);

  // sanitize html before parsing:
  const purify = createPurify();
  const cleanHTMLcontent = purify.sanitize(article.content, {
    USE_PROFILES: { html: true },
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="article__containter">
      <article>
        <h1 className="article__header">{article.title}</h1>
        <div className="article__content">{parse(cleanHTMLcontent)}</div>
      </article>
      <div className="article__btns">
        <Link to="/articles">
          <button className="article__btn see-all-btn">See all articles</button>
        </Link>
        <button onClick={scrollToTop} className="article__btn back-to-top-btn">
          Back to top
        </button>
      </div>
    </div>
  );
};

export default SingleArticle;
