import "./Button.css";

export interface ButtonProps {
  buttonName: string;
  className: string;
  imgSrc: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonName,
  className,
  imgSrc,
}): JSX.Element => {
  return (
    <button className={className}>
      <img src={imgSrc} alt="icon" className="iconBtn" />
      {buttonName}
    </button>
  );
};

export default Button;
