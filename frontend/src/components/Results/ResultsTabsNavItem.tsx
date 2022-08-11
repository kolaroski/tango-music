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
    <li onClick={handleClick} className={activeTab === id ? 'active' : ''}>
      {title}
    </li>
  );
};

export default ResultsTabsNavItem;
