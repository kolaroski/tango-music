import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesInfo } from '../DUMMY_DATA';

const SearchCategories: React.FC = (): JSX.Element => {
  return (
    <>
      <div>
        {categoriesInfo.map(category => {
          return (
            <div key={category.id}>
              <h1>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </h1>
              <Link to={`/results/${category.name.toLowerCase()}list`}>
                Show results for {category.name.toLowerCase()}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchCategories;
