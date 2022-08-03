import { Link } from 'react-router-dom';

const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <h2>404</h2>
      <p>PAGE NOT FOUND</p>
      <Link to="/">Back home</Link>
    </div>
  );
};

export default ErrorPage;
