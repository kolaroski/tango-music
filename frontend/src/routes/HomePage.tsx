import React from 'react';
import '../components/Articles.css';

const HomePage: React.FC = (): JSX.Element => {
  return (
    <div className="home">
      <h2 className="article home__main-header">
        <span className="home__main-text">
          Where words fail, <span className="home__strong-text">music</span>{' '}
          speaks.
        </span>
      </h2>
      <h4 className="home__quote">
        <em>- Hans Christian Andersen</em>
      </h4>
    </div>
  );
};

{
  /* <span className="home__strong-text">your life</span> */
}

export default HomePage;
