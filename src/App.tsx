import "./App.css"
import {CardList} from "./containers/CardList"

function App() {
  return (
    <div>
      <div>
        <h1 className="testColor">Go to hell(o) world.</h1>
        <h2>tango-music-project</h2>
      </div>
        <main id="browser">
        <h2 className="rubric">BROWSE BY CATEGORIES</h2>
        <h2 className="Orchestras">Orchestras</h2>
        <CardList titles={["Kire", "Ana", "Bane", "Kire", "Ana", "Bane", "Kire", "Ana", "Bane", "Kire", "Ana", "Bane"]} />
        </main>
    </div>
  );
}

export default App;
