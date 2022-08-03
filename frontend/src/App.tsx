import './App.css';
import './variables.css';
import useMap from './utils';
import { useEffect, useState } from 'react';
import axios from '../node_modules/axios/index';
import NavBar from './containers/NavBar';
import SearchBar from './containers/SearchBar';
import Footer from './components/Footer';

// routing draft:
import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './routes/HomePage';
import ArticlesContainer from './containers/ArticleContainer';
import Articles from './routes/Articles';
import SingleArticle from './routes/SingleArticle';
import SearchResults from './routes/SearchResults';
import ErrorPage from './routes/ErrorPage';
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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <SearchBar
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
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesContainer />}>
            <Route index element={<Articles />} />
            <Route path=":articleId" element={<SingleArticle />} />
          </Route>
          <Route path="results" element={<SearchResults />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
