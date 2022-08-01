import './App.css';
import './variables.css';
import { NavBar } from './components/NavBar';
import { SearchBar } from './components/SearchBar';
import { CardList } from './containers/CardList';
import SideBar from './containers/SideBar';
import Footer from './components/Footer';
import axios from '../node_modules/axios/index';
import { useEffect, useState } from 'react';
import useMap from './utils';

// routing draft:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articles from './routes/articles';
import TangoOrigin from './routes/tango-origin';
// ---------------

const ORQUESTRAS_URL = 'http://localhost:8000/all/orquestras';
const SINGERS_URL = 'http://localhost:8000/all/singers';

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

function setMapFalse(
  map: Omit<Map<string, boolean>, 'set' | 'clear' | 'delete'>,
  action: (map: Map<string, boolean>) => void
): void {
  const entries = new Map(map);
  entries.forEach((value, key) => {
    entries.set(key, false);
  });
  action(entries);
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
    'Guardia Vieja',
    'Golden Age',
    'Contemporary',
  ]);
  const [allStyles, setAllStyles] = useState<Array<string>>([
    'Milonga',
    'Tango',
    'Vals',
  ]);

  // Maps initial values
  const initialFStyleMap = initializeMap(allStyles);
  const initialFPMap = initializeMap(allPeriods);

  // Map hooks
  const [filterStyleMap, filterStyleActions] = useMap<string, boolean>(
    initialFStyleMap
  );
  const [filterPeriodMap, filterPeriodActions] = useMap<string, boolean>(
    initialFPMap
  );

  // RESET ALL MAPS
  const onResetAllFilters = () => {
    setMapFalse(filterStyleMap, filterStyleActions.setAll);
    setMapFalse(filterPeriodMap, filterPeriodActions.setAll);
  };

  return (
    <Router>
      <div>
        <div>
          <NavBar />
          <SearchBar />
          <Routes>
            <Route path="tango-history" element={<TangoOrigin />} />
            <Route path="blog" element={<Articles />} />
          </Routes>
        </div>
        {/* <SideBar
          stylesOptions={{
            optionsSetter: filterStyleActions.set,
            checkedFilters: filterStyleMap,
          }}
          periodsOptions={{
            optionsSetter: filterPeriodActions.set,
            checkedFilters: filterPeriodMap,
          }}
          resetAllFilters={onResetAllFilters}
        />
        <div className="main-content"></div>
        <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
