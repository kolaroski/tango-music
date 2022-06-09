import React from "react";
import "./NavBar.css"



export const NavBar: React.FC<{}> = ({}): JSX.Element => {
    return <div className="topnav">
      <a className="title">tango-music-project</a>
      <input type="text" placeholder="Search.."></input>
      <a>Orchestras</a>
      <a>Singers</a>
      <a>Style</a>
      <a>Decade</a>
      <a>Speed</a>
    </div>
};

