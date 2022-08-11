export interface ResultsProps {
  results: { id: string; name: string; content: string[] }[];
}

const TracksTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  return (
    <div className="single-tab tab__tracks">
      <ul className="list-results">
        {results.map(result => {
          return result.content.map(res => {
            return <li>{res}</li>;
          });
        })}
      </ul>
    </div>
  );
};

export default TracksTab;
