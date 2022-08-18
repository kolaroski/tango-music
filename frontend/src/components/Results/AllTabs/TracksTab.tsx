interface TracksObject {
  Orchestra: string[];
  Title: string[];
  Singer: string[];
  Date: string[];

  // reminder: available data
  // Author: "Jean De Kelsar (Keller Sarmiento, Carlos)"
  // Composer: "Eduardo Bianco"
  // Date: "1926-10-23"
  // Orchestra: "Eduardo BIANCO - BACHICHA"
  // Singer: "Juan Raggi y Eduardo Bianco"
  // Style: "TANGO"
  // Title: "Crepúsculo"

  // need to add unique IDs...?
}

export interface ResultsProps {
  results: TracksObject[];
}

const TracksTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  return (
    <div className="single-tab tab__tracks">
      <ul className="list-results">
        {results.map(result => {
          return (
            <li key={Math.random().toString()}>
              {result.Title}, by orchestra {result.Orchestra} (year{' '}
              {result.Date.slice(0, 4)})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TracksTab;
