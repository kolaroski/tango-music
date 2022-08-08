export interface ResultsTabContentProps {
  id: string;
  activeTab: string;
  children: JSX.Element;
}

const ResultsTabContent: React.FC<ResultsTabContentProps> = ({
  id,
  activeTab,
  children,
}): JSX.Element => {
  return activeTab === id ? (
    <div className="tab-content">{children}</div>
  ) : null;
};

export default ResultsTabContent;
