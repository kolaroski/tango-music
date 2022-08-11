import '../components/Results/Results.css';
import { useState } from 'react';
import ResultsTabsNavItem from '../components/Results/ResultsTabsNavItem';
import ResultsTabContent from '../components/Results/ResultsTabContent';

import OrchestrasTab from '../components/Results/AllTabs/OrchestrasTab';
import SingersTab from '../components/Results/AllTabs/SingersTab';
import TracksTab from '../components/Results/AllTabs/TracksTab';

import { categoriesInfo, dummyResults } from '../DUMMY_DATA';

export interface ResultsProps {
  keyword: string;
}

const Results: React.FC<ResultsProps> = ({ keyword }): JSX.Element => {
  const [activeTab, setActiveTab] = useState('tab-orchestras');

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
          <h3>Results for keyword: {keyword}</h3>
          <ResultsTabContent
            id="tab-orchestras"
            activeTab={activeTab}
            children={
              <OrchestrasTab
                results={dummyResults.filter(category => {
                  return category.id === 'tab-orchestras';
                })}
              />
            }
          />

          <ResultsTabContent
            id="tab-singers"
            activeTab={activeTab}
            children={
              <SingersTab
                results={dummyResults.filter(category => {
                  return category.id === 'tab-singers';
                })}
              />
            }
          />
          <ResultsTabContent
            id="tab-tracks"
            activeTab={activeTab}
            children={
              <TracksTab
                results={dummyResults.filter(category => {
                  return category.id === 'tab-tracks';
                })}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default Results;
