import { Outlet } from 'react-router-dom';

const MainContent: React.FC = (): JSX.Element => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainContent;
