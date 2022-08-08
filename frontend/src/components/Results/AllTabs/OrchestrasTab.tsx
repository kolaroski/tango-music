export interface ResultsProps {
  results: { id: string; name: string; content: string[] }[];
}

const OrchestrasTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  return (
    <div className="single-tab tab__orchestras">
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

export default OrchestrasTab;
