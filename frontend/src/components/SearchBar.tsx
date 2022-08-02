import './SearchBar.css';
import CategoryItem from './CategoryItem';
import Button from './Button';
import { StyleIcon, PeriodIcon } from '../assets/SideBarIcons';

interface OptionsCoreItem {
  optionsSetter: (key: string, value: boolean) => void;
  checkedFilters: Omit<Map<string, boolean>, 'set' | 'clear' | 'delete'>;
}

export interface SearchBarProps {
  stylesOptions: OptionsCoreItem;
  periodsOptions: OptionsCoreItem;
  resetAllFilters: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  stylesOptions,
  periodsOptions,
  resetAllFilters,
}): JSX.Element => {
  const categoriesArr: Array<{
    icon: JSX.Element;
    heading: string;
    optionsCoreItem: OptionsCoreItem;
  }> = [
    {
      icon: <StyleIcon color="#055a5f" size={25} />,
      heading: 'Select style',
      optionsCoreItem: stylesOptions,
    },
    {
      icon: <PeriodIcon color="#055a5f" size={25} />,
      heading: 'Select period',
      optionsCoreItem: periodsOptions,
    },
  ];

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
          />
          <button type="submit" className="searchButton">
            <img
              src={require('../assets/searchImg.svg')}
              alt="search-icon"
              className="search-bar__icon"
            />
          </button>
        </div>
      </div>

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
      <Button
        buttonName="Reset all filters"
        className="btn resetBtn"
        imgSrc={require('../assets/reloadImg.svg')}
        onClick={resetAllFilters}
      />

      {/* <div className="search-container">
        <div className="search-field">
          <div>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SearchBar;
