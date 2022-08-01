import './SearchBar.css';

export const SearchBar: React.FC<{}> = ({}): JSX.Element => {
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
          />
          <button type="submit" className="searchButton">
            <img
              src={require('../assets/searchImg.svg')}
              alt="search-icon"
              className="search-bar__icon"
            />
          </button>
        </div>
      </div>

      <div className="search-container">
        <div className="search-field">
          <div>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </>
  );
};
