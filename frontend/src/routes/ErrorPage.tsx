import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 4000);
  }, [navigate]);
  return (
    <div>
      <h2>404</h2>
      <p>PAGE NOT FOUND</p>
      <p>Redirecting to home page...</p>
      <Link to="/">Go back home now</Link>
    </div>
  );
};

export default ErrorPage;
