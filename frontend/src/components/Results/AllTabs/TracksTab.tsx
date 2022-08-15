export interface ResultsProps {
  results: string[];
}

const TracksTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  return (
    <div className="single-tab tab__tracks">
      <ul className="list-results">
        {/* TOO SLOW::: */}
        {/* {results.map(result => {
          return results.map(res => {
            return <li>{res}</li>;
          });
        })} */}
      </ul>
    </div>
  );
};

export default TracksTab;
