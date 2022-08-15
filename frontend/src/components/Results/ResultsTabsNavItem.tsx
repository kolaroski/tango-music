export interface ResultsTabsNavItemProps {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const ResultsTabsNavItem: React.FC<ResultsTabsNavItemProps> = ({
  id,
  title,
  activeTab,
  setActiveTab,
}): JSX.Element => {
  const handleClick = () => {
    setActiveTab(id);
  };
  return (
    <li
      // id={id}
      id={Math.random().toString()}
      onClick={handleClick}
      className={activeTab === id ? 'active' : ''}
    >
      {title}
    </li>
  );
};

export default ResultsTabsNavItem;
