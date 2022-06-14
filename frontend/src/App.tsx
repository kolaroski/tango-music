import "./App.css";
import { NavBar } from "./components/NavBar";
import { CardList } from "./containers/CardList";
import SideBar from "./containers/SideBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div>
        <h3 className="cardlistHeading">Orchestras</h3>
        <CardList titles={["001", "002", "003", "004", "005", "006"]} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
