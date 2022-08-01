import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar: React.FC<{}> = ({}): JSX.Element => {
  const [navMenuIsActive, setNavMenuIsActive] = useState(false);
  const toggleNavMenu = () => {
    setNavMenuIsActive(current => !current);
  };
  return (
    <nav className="navbar">
      <div className="navbar__title-box">
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

      <div className="links active" onClick={() => setNavMenuIsActive(false)}>
        <Link to="/orchestra" className="navbar__link">
          Orchestras
        </Link>
        <Link to="/singers" className="navbar__link">
          Singers
        </Link>
        <Link to="/tango-origin" className="navbar__link">
          Origin of tango
        </Link>
        <Link to="/epocas" className="navbar__link">
          Epocas
        </Link>
      </div>
    </nav>
  );
};
