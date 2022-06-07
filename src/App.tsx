import "./App.css";
import { CardList } from "./containers/CardList";
import SideBar from "./containers/SideBar";

function App() {
  return (
    <div>
      <div>
        <h2>tango-music-project</h2>
      </div>
      <SideBar />
      <div className="displayStyle">
        <CardList
          titles={[
            "Kire",
            "Ana",
            "Bane",
            "Kire",
            "Ana",
            "Bane",
            "Kire",
            "Ana",
            "Bane",
            "Kire",
            "Ana",
            "Bane",
          ]}
        />
      </div>
    </div>
  );
}

export default App;
