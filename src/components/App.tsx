import React from "react";
import SideBar from "./SideBar";
import Container from "./Container";
import "./App.css";
import Content from "./Content";
import ContentCopy from "./Content copy";


function App() {
  return (
    <div>
      <div>
        <h1 className="testColor">Go to hell(o) world.</h1>
        <h2>tango-music-project</h2>
      </div>
      <div className="displayStyle">
        <SideBar />
        <Container className="setBiggerTextTest redText">
          <Content />
        </Container>
        <Container className="setBiggerTextTest">
          <ContentCopy />
        </Container>
      </div>
    </div>
  );
}

export default App;
