export interface ResultsProps {
  results: string[];
}

const OrchestrasTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  return (
    <div className="single-tab tab__orchestras">
      <ul className="list-results">
        {results.map(result => {
          return results.map(res => {
            return <li key={Math.random().toString()}>{res}</li>;
          });
        })}
      </ul>
    </div>
  );
};

export default OrchestrasTab;
