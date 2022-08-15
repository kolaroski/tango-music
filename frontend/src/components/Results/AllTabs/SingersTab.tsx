export interface ResultsProps {
  results: string[];
}

const SingersTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  return (
    <div className="single-tab singers">
      <ul className="list-results">
        {results.map(result => {
          return results.map(res => {
            return <li>{res}</li>;
          });
        })}
      </ul>
    </div>
  );
};

export default SingersTab;
