import "./OptionsItem.css";

export interface OptionsItemProps {
  heading: string;
  emoji: string;
  hidden: string;
}

const OptionsItem: React.FC<OptionsItemProps> = ({
  heading,
  emoji,
  hidden,
}): JSX.Element => {
  return (
    <div className="OptionsItemBox">
      <div className="emoji">{emoji}</div>
      <div className={`optionHeading ${hidden}`}>{heading}</div>
      <button className={`arrowDown ${hidden}`}></button>
    </div>
  );
};

export default OptionsItem;
