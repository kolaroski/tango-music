import './SearchCategories.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesInfo } from '../DUMMY_DATA';
import SearchResults from '../containers/SearchResults';

export interface SearchCategoriesProps {
  keyword: string;
}

const SearchCategories: React.FC<SearchCategoriesProps> = ({
  keyword,
}): JSX.Element => {
  return (
    <>
      <div className="search-category__box">
        {categoriesInfo.map(category => {
          return (
            <div key={category.id} className="search-category__card">
              {/* <h5>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </h5> */}
              <Link to={`/results/${category.name.toLowerCase()}list`}>
                <button className="search-category__link">
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchCategories;
