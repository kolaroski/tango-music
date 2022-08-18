export interface ResultsProps {
  results: string[];
}

const SingersTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  return (
    <div className="single-tab singers">
      <ul className="list-results">
        {results.map(result => {
          return <li key={Math.random().toString()}>{result}</li>;
        })}
      </ul>
    </div>
  );
};

export default SingersTab;
