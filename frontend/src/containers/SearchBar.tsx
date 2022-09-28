import './SearchBar.css';
import CategoryItem from '../components/CategoryItem';
import Button from '../components/Button';
import { StyleIcon, PeriodIcon } from '../assets/SideBarIcons';
import { useState, KeyboardEvent } from 'react';
import {
  // createSearchParams,
  // useSearchParams,
  Outlet,
  useNavigate,
  // Link,
} from 'react-router-dom';

interface OptionsCoreItem {
  optionsSetter: (key: string, value: boolean) => void;
  checkedFilters: Omit<Map<string, boolean>, 'set' | 'clear' | 'delete'>;
}

export interface SearchBarProps {
  stylesOptions: OptionsCoreItem;
  periodsOptions: OptionsCoreItem;
  resetAllFilters: () => void;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  stylesOptions,
  periodsOptions,
  resetAllFilters,
  setSearchTerm,
}): JSX.Element => {
  const categoriesArr: Array<{
    icon: JSX.Element;
    heading: string;
    optionsCoreItem: OptionsCoreItem;
  }> = [
    {
      icon: <StyleIcon color="#262f28" size={25} />,
      heading: 'Select style',
      optionsCoreItem: stylesOptions,
    },
    {
      icon: <PeriodIcon color="#262f28" size={25} />,
      heading: 'Select period',
      optionsCoreItem: periodsOptions,
    },
  ];

  // Get search keyword from user
  const [query, setQuery] = useState('');

  ///// WIP: search params ------------------------------
  // SEARCH PARAMS USE PARAMS HOOK - REACT ROUTER DOM:
  // VARIJANTA SO SEARCH PARAMS, url e /?search={keywords}
  // const [searchParams, setSearchParams] = useSearchParams();
  // const prebaruvanjeOdKorisnik = encodeURIComponent(searchParams.get('search'));

  // Navigate to search results and send search term up
  const navigate = useNavigate();
  const navigateToResults = () => {
    console.log(query);
    // console.log(prebaruvanjeOdKorisnik);
    // const encodedQuery = encodeURIComponent(query);
    setSearchTerm(query);
    // navigate(`/search/${query}`);
    // navigate(`?search=${query}`);
    navigate(`/search/results`);
    // navigate(`/?search=${prebaruvanjeOdKorisnik}`);

    // navigate({
    //   pathname: '/search/',
    //   search: `${createSearchParams(query)}`,
    // });
  };
  ///// WIP: SEARCH PARAMS ------------------------------

  // Detect when ENTER key is pressed when typing in input field
  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigateToResults();
    }
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={event => setQuery(encodeURIComponent(event.target.value))}
            ///// WIP: search params ------------------------------
            // VARIJANTA SO SEARCH PARAMS, url e /?search={keywords}
            // onChange={event => {
            //   setSearchParams(
            //     createSearchParams({ search: event.target.value })
            //   );
            //   setQuery(encodeURIComponent(event.target.value));
            // }}
            ///// WIP: search params ------------------------------

            onKeyDown={handleEnterKey}
          />

          <button
            type="submit"
            className="searchButton"
            onClick={navigateToResults}
          >
            <img
              src={require('../assets/searchImg.svg')}
              alt="search-icon"
              className="search-bar__icon"
            />
          </button>
        </div>
      </div>

      {/* --- DRAFT FOR ADDITIONAL CATEGORIES AND FILTERING FROM PREVIOUS VERSION: */}
      {/* <div className="categories-wrapper">
        {categoriesArr.map(
          (
            option: {
              icon: JSX.Element;
              heading: string;
              optionsCoreItem: OptionsCoreItem;
            },
            index: number
          ) => (
            <CategoryItem
              key={index}
              icon={option.icon}
              heading={option.heading}
              optionsSetter={option.optionsCoreItem.optionsSetter}
              checkedFilters={option.optionsCoreItem.checkedFilters}
            />
          )
        )}
      </div>
      <div className="reset-wrapper">
        <Button
          buttonName="Reset all filters"
          className="btn resetBtn"
          imgSrc={require('../assets/reloadImg.svg')}
          onClick={resetAllFilters}
        />
      </div> */}
      {/* <Outlet /> */}
    </>
  );
};

export default SearchBar;
