import '../components/Results/Results.css';
import { useEffect, useState } from 'react';
import ResultsTabsNavItem from '../components/Results/ResultsTabsNavItem';
import ResultsTabContent from '../components/Results/ResultsTabContent';

import OrchestrasTab from '../components/Results/AllTabs/OrchestrasTab';
import SingersTab from '../components/Results/AllTabs/SingersTab';
import TracksTab from '../components/Results/AllTabs/TracksTab';

import { categoriesInfo, dummyResults } from '../DUMMY_DATA';
import axios from 'axios';

interface SearchResults {
  orquestras: Array<string>;
  singers: Array<string>;
  decades: Array<string>;
  styles: Array<string>;
}

export interface ResultsProps {
  keyword: string;
  searchResults?: SearchResults;
}

const Results: React.FC<ResultsProps> = ({
  keyword,
  searchResults,
}): JSX.Element => {
  const [activeTab, setActiveTab] = useState('tab-orchestras');

  // make API call for searchTerm
  function getResultsByKeyword(): Promise<{}> {
    return axios
      .get(`http://localhost:8000/filter/search/${keyword}`)
      .then(function (response) {
        return response.data;
      });
  }
  // manage state of search results
  const [allResults, setAllResults] = useState({
    Orchestra: [''],
    Singer: [''],
    Title: [''],
  });
  // fetch and set results
  useEffect(() => {
    getResultsByKeyword().then(function (results: {
      Orchestra: Array<string>;
      Singer: Array<string>;
      Title: Array<string>;
    }) {
      setAllResults(results);
    });
  }, [keyword]);

  return (
    <>
      <div className="results">
        {/* RESULTS TABS ----------------------- */}
        <div className="results_nav-box">
          <ul className="results-tabs__nav">
            {categoriesInfo.map(category => {
              return (
                <ResultsTabsNavItem
                  title={category.name}
                  id={category.id}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              );
            })}
          </ul>
        </div>

        {/* RESULTS CONTENT -------------------  */}
        <div className="results-tabs__outlet">
          <ResultsTabContent
            id="tab-orchestras"
            activeTab={activeTab}
            children={<OrchestrasTab results={allResults.Orchestra} />}
          />

          <ResultsTabContent
            id="tab-singers"
            activeTab={activeTab}
            children={<SingersTab results={allResults.Singer} />}
          />
          <ResultsTabContent
            id="tab-tracks"
            activeTab={activeTab}
            children={<TracksTab results={allResults.Title} />}
          />
        </div>
      </div>
    </>
  );
};

export default Results;
