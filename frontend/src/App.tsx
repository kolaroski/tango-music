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

function initializeMap(
  array: Array<string>,
  default_value: boolean = false
): Map<string, boolean> {
  let map = new Map<string, boolean>();
  for (const val of array) {
    map.set(val, default_value);
  }
  return map;
}

function setMapFalse(map: Omit<Map<string, boolean>, 'set' | 'clear' | 'delete'>, action: (map: Map<string, boolean>) => void): void {
  const entries = new Map(map)
  entries.forEach((value, key) => {
    entries.set(key, false)
  })
  action(entries)
};

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
  let initialFOMap = initializeMap(allOrquestras);
  let initialFSMap = initializeMap(allSingers);
  const initialFStyleMap = initializeMap(allStyles);
  const initialFPMap = initializeMap(allPeriods);

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


  useEffect(() => {
    initialFOMap = initializeMap(allOrquestras)
    filterOrquestrasActions.setAll(initialFOMap)
  }, [allOrquestras]);

  useEffect(() => {
    initialFSMap = initializeMap(allSingers)
    filterSingersActions.setAll(initialFSMap)
  }, [allSingers]);

  // RESET ALL MAPS
  const onResetAllFilters = () => {
    setMapFalse(filterOrquestrasMap, filterOrquestrasActions.setAll);
    setMapFalse(filterSingersMap, filterSingersActions.setAll);
    setMapFalse(filterStyleMap, filterStyleActions.setAll);
    setMapFalse(filterPeriodMap, filterPeriodActions.setAll);
  };
  console.log(filterStyleMap)
  return (
    <div>
      <NavBar />
      <SideBar
        orchestrasOptions={{
          options: allOrquestras,
          optionsSetter: filterOrquestrasActions.set,
          checkedFilters: filterOrquestrasMap,
        }}
        singersOptions={{
          options: allSingers,
          optionsSetter: filterSingersActions.set,
          checkedFilters: filterSingersMap,
        }}
        stylesOptions={{
          options: allStyles,
          optionsSetter: filterStyleActions.set,
          checkedFilters: filterStyleMap,
        }}
        periodsOptions={{
          options: allPeriods,
          optionsSetter: filterPeriodActions.set,
          checkedFilters: filterPeriodMap,
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
