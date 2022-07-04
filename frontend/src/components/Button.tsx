import "./Button.css";

export interface ButtonProps {
  buttonName: string;
  className: string;
  imgSrc: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonName,
  className,
  imgSrc,
  onClick,
}): JSX.Element => {
  return (
    <button className={className} onClick={onClick}>
      <img src={imgSrc} alt="icon" className="iconBtn" />
      {buttonName}
    </button>
  );
};

export default Button;
