import '../components/Results/Results.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResultsTabsNavItem from '../components/Results/ResultsTabsNavItem';
import ResultsTabContent from '../components/Results/ResultsTabContent';

import OrchestrasTab from '../components/Results/AllTabs/OrchestrasTab';
import SingersTab from '../components/Results/AllTabs/SingersTab';
import TracksTab from '../components/Results/AllTabs/TracksTab';

export interface ResultsProps {
  keyword: string;
}

const Results: React.FC<ResultsProps> = ({ keyword }): JSX.Element => {
  const [activeTab, setActiveTab] = useState('tab-orchestras');

  // make API call for searchTerm
  async function getResultsByKeyword(): Promise<{}> {
    ///// WIP: search params ------------------------------
    // const encodedKeyword = encodeURIComponent(keyword);
    console.log(keyword);
    const response = await axios.get(
      `http://localhost:8000/filter/search/${keyword}`
      // `http://localhost:8000/?search=${keyword}`
      ///// WIP: search params ------------------------------
    );
    return response.data;
  }

  // manage state of search results
  const [allResults, setAllResults] = useState({
    Orchestra: [''],
    Singer: [''],
    Title: [
      {
        Orchestra: '',
        Title: '',
        Singer: '',
        Style: '',
        Composer: '',
        Author: '',
        Date: '',
      },
    ],
  });

  // fetch and set results
  useEffect(() => {
    getResultsByKeyword().then(function (results: {
      Orchestra: Array<string>;
      Singer: Array<string>;
      Title: [
        {
          Orchestra: string;
          Title: string;
          Singer: string;
          Style: string;
          Composer: string;
          Author: string;
          Date: string;
        }
      ];
    }) {
      setAllResults(results);
    });
  }, [keyword]);

  // data for the tabs
  const categoriesInfo = [
    {
      id: 'tab-orchestras',
      name: 'Orchestras',
    },
    {
      id: 'tab-singers',
      name: 'Singers',
    },
    {
      id: 'tab-tracks',
      name: 'Tracks',
    },
  ];

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
                  key={category.id}
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
