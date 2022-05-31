import SideBar from "./SideBar";
import Container from "./Container";
import "./App.css";
import Content from "./Content";

function App() {
  return (
    <div>
      <div>
        <h1 className="testColor">Go to hell(o) world.</h1>
        <h2>tango-music-project</h2>
      </div>
      <div className="displayStyle">
        <SideBar />
        <Container className="setBiggerTextTest greenText">
          <Content />
        </Container>
      </div>
    </div>
  );
}

export default App;
