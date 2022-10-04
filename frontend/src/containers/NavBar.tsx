import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';
import { LogoIcon1, LogoIcon2 } from '../assets/LogoIcon';

import SearchBar from './SearchBar';

interface OptionsCoreItem {
  optionsSetter: (key: string, value: boolean) => void;
  checkedFilters: Omit<Map<string, boolean>, 'set' | 'clear' | 'delete'>;
}

export interface NavBarProps {
  stylesOptions: OptionsCoreItem;
  periodsOptions: OptionsCoreItem;
  resetAllFilters: () => void;
  setSearchTerm: (term: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  stylesOptions,
  periodsOptions,
  resetAllFilters,
  setSearchTerm,
}): JSX.Element => {
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
          <Link to="/" className="navbar__link-home ">
            <div className="navbar__logo">
              {/* TBD: OPTIONS FOR LOGOS AND/OR TEXT */}
              <LogoIcon1 color="white" size={80} />
              {/* <LogoIcon2 color="white" size={80} /> */}
              {/* <p className="navbar__title">tango-music-project</p> */}
            </div>
          </Link>
        </div>

        <SearchBar
          stylesOptions={stylesOptions}
          periodsOptions={periodsOptions}
          resetAllFilters={resetAllFilters}
          setSearchTerm={setSearchTerm}
        />

        <input
          id="menu-toggle"
          type="checkbox"
          checked={navMenuIsActive}
          readOnly
        />
        <label
          className="menu-button-container"
          htmlFor="menu-toggle"
          onClick={toggleNavMenu}
        >
          <div className="menu-button"></div>
        </label>

        <div className="links" onClick={closeMenu}>
          <Link to="/articles/tango-history" className="navbar__link">
            History
          </Link>
          <Link to="/articles/orchestras" className="navbar__link">
            Orchestras
          </Link>
          <Link to="/articles/singers" className="navbar__link">
            Singers
          </Link>
          <Link to="/articles" className="navbar__link">
            Blog
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
