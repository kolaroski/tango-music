import "./App.css"
import {CardList} from "./containers/CardList"

function App() {
  return (
    <div>
      <div>
        <h1 className="testColor">Go to hell(o) world.</h1>
        <h2>tango-music-project</h2>
      </div>
      <div className="displayStyle">
        <CardList titles={["Kire", "Ana", "Bane", "Kire", "Ana", "Bane", "Kire", "Ana", "Bane", "Kire", "Ana", "Bane"]} />
      </div>
    </div>
  );
}

export default App;
