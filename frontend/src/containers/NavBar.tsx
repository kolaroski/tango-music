import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC<{}> = ({}): JSX.Element => {
  const [navMenuIsActive, setNavMenuIsActive] = useState(false);
  const toggleNavMenu = () => {
    setNavMenuIsActive(current => !current);
  };

  const closeMenu = () => {
    setNavMenuIsActive(false);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar__title-box" onClick={closeMenu}>
          <Link to="/" className="navbar__link-home">
            <a className="navbar__title">tango-music-project</a>
          </Link>
        </div>
        <input id="menu-toggle" type="checkbox" checked={navMenuIsActive} />
        <label
          className="menu-button-container"
          htmlFor="menu-toggle"
          onClick={toggleNavMenu}
        >
          <div className="menu-button"></div>
        </label>

        <div className="links" onClick={closeMenu}>
          <Link to="/articles/tango-history" className="navbar__link">
            History of tango
          </Link>
          <Link to="/articles/orchestras" className="navbar__link">
            Orchestras
          </Link>
          <Link to="/articles/singers" className="navbar__link">
            Singers
          </Link>
          <Link to="/articles" className="navbar__link">
            All articles
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
