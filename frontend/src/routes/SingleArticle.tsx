import { Link, useParams } from 'react-router-dom';
import articles_data from '../articles_data';

const SingleArticle: React.FC = (): JSX.Element => {
  const { articleId } = useParams();
  const article = articles_data.find(article => article.id === articleId);

  return (
    <>
      <article>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </article>
      <Link to="/articles">Back to all articles</Link>
    </>
  );
};

export default SingleArticle;
