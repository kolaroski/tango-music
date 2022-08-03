import { Outlet } from 'react-router-dom';

const ArticlesContainer: React.FC = (): JSX.Element => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ArticlesContainer;
