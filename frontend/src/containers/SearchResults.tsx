import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { dummyResults } from '../DUMMY_DATA';

export interface SearchResultsProps {
  keyword: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  keyword,
}): JSX.Element => {
  const { categoryId } = useParams();
  const category = dummyResults.find(category => category.id === categoryId);
  return (
    <>
      <h1>
        Results {keyword ? `for '${keyword}'` : ''} in category '{category.name}
        ':
      </h1>
      {category.content.map(result => {
        return <p>{result}</p>;
      })}
    </>
  );
};

export default SearchResults;
