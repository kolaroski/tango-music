import "./App.css";
import { NavBar } from "./components/NavBar";
import { CardList } from "./containers/CardList";
import SideBar from "./containers/SideBar";
import Footer from "./components/Footer";
import axios from "../node_modules/axios/index";
import { useEffect, useState } from "react";
import useMap from "./utils";

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

function intializeMap(
  array: Array<string>,
  default_value: boolean = false
): Map<string, boolean> {
  let map = new Map<string, boolean>();
  for (const val of array) {
    map.set(val, default_value);
  }
  return map;
}

function App() {
  // Define states for API queries
  const [allOrquestras, setAllOrquestras] = useState<Array<string>>([]);
  const [allSingers, setAllSingers] = useState<Array<string>>([]);

  // Fetch and set all the orquestras and all the singers
  useEffect(() => {
    getAllOrquestras().then(function (orquestras: Array<string>) {
      setAllOrquestras(orquestras);
    });

    getAllSingers().then(function (singers: Array<string>) {
      setAllSingers(singers);
    });
  }, []);

  const [allPeriods, setAllPeriods] = useState<Array<string>>([
    "Guardia Vieja",
    "Golden Age",
    "Contemporary",
  ]);
  const [allStyles, setAllStyles] = useState<Array<string>>([
    "Milonga",
    "Tango",
    "Vals",
  ]);

  // Maps initial values
  const initialFOMap = intializeMap(allOrquestras);
  const initialFSMap = intializeMap(allSingers);
  const initialFStyleMap = intializeMap(allStyles);
  const initialFPMap = intializeMap(allPeriods);

  // Map hooks
  const [filterOrquestrasMap, filterOrquestrasActions] = useMap<
    string,
    boolean
  >(initialFOMap);
  const [filterSingersMap, filterSingersActions] = useMap<string, boolean>(
    initialFSMap
  );
  const [filterStyleMap, filterStyleActions] = useMap<string, boolean>(
    initialFStyleMap
  );
  const [filterPeriodMap, filterPeriodActions] = useMap<string, boolean>(
    initialFPMap
  );

  // checking the maps:
  console.log("orchestras", filterOrquestrasMap);
  console.log("singers", filterSingersMap);
  console.log("style", filterStyleMap);
  console.log("period", filterPeriodMap);

  // RESET ALL MAPS:
  const onResetAllFilters = () => {
    filterOrquestrasActions.reset();
    filterSingersActions.reset();
    filterStyleActions.reset();
    filterPeriodActions.reset();
  };

  return (
    <div>
      <NavBar />
      <SideBar
        orchestrasOptions={{
          options: allOrquestras,
          optionsSetter: filterOrquestrasActions.set,
        }}
        singersOptions={{
          options: allSingers,
          optionsSetter: filterSingersActions.set,
        }}
        stylesOptions={{
          options: allStyles,
          optionsSetter: filterStyleActions.set,
        }}
        periodsOptions={{
          options: allPeriods,
          optionsSetter: filterPeriodActions.set,
        }}
        resetAllFilters={onResetAllFilters}
      />
      <div className="main-content">
        <div>
          <h3 className="cardlistHeading">Orchestras</h3>
          <CardList titles={allOrquestras} />
        </div>
        <div>
          <h3 className="cardlistHeading">Singers</h3>
          <CardList titles={allSingers} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
