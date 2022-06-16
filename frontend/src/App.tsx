import "./App.css";
import { NavBar } from "./components/NavBar";
import { CardList } from "./containers/CardList";
import SideBar from "./containers/SideBar";
import Footer from "./components/Footer";
import axios from "../node_modules/axios/index";
import { useState } from "react";

const ORQUESTRAS_URL = "http://localhost:8000/all/orquestras";
const SINGERS_URL = "http://localhost:8000/all/singers";

function getAllOrquestras(): Promise<Array<string>> {
  return axios.get(ORQUESTRAS_URL).then(function (response) {
    return response.data as Array<string>;
  });
}

function getAllSingers(): Promise<Array<string>> {
  return axios.get(SINGERS_URL).then(function (response) {
    return response.data as Array<string>;
  });
}

function App() {
  const [all_orquestras, setAllOrquestras] = useState<Array<string>>([]);
  getAllOrquestras().then(function (orquestras: Array<string>) {
    setAllOrquestras(orquestras);
  });

  const [all_singers, setAllSingers] = useState<Array<string>>([]);
  // Fetch all the orquestras and all the singers
  getAllOrquestras().then(function (orquestras: Array<string>) {
    setAllOrquestras(orquestras);
  });

  getAllSingers().then(function (singers: Array<string>) {
    setAllSingers(singers);
  });

  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="main-content">
        <div>
          <h3 className="cardlistHeading">Orchestras</h3>
          <CardList titles={all_orquestras} />
        </div>
        <div>
          <h3 className="cardlistHeading">Singers</h3>
          <CardList titles={all_singers} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
