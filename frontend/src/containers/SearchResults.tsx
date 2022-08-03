import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { dummyResults } from '../DUMMY_DATA';

const SearchResults: React.FC = (): JSX.Element => {
  const { categoryId } = useParams();
  const category = dummyResults.find(category => category.id === categoryId);
  return (
    <>
      <h1>Search results for {category.name}:</h1>
      {category.content.map(result => {
        return <p>{result}</p>;
      })}
    </>
  );
};

export default SearchResults;
