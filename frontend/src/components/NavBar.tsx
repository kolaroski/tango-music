import React from "react";
import "./NavBar.css";

export const NavBar: React.FC<{}> = ({}): JSX.Element => {
  return (
    <div className="topnav">
      <a className="title">tango-music-project</a>
      <div className="nav-container-right">
        <div className="nav-links">
          <a>Orchestras</a>
          <a>Singers</a>
          <a>Style</a>
          <a>Period</a>
        </div>
        <input type="text" placeholder="Search.."></input>
      </div>
    </div>
  );
};
