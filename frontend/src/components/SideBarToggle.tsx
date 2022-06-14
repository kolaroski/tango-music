import "./SideBarToggle.css";

export interface ToggleProps {
  toggleHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  textToggle: string;
  imgSrc: string;
}

const SideBarToggle: React.FC<ToggleProps> = ({
  toggleHandler,
  textToggle,
  imgSrc,
}): JSX.Element => {
  return (
    <button className="toggleBtn" onClick={toggleHandler}>
      <img
        src={require(`../utils/${imgSrc}Img.svg`)}
        alt="toggle"
        className="iconToggle"
      />

      {textToggle}
    </button>
  );
};

export default SideBarToggle;
