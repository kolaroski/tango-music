import "./OptionsItem.css";
import { useState } from "react";

export interface OptionsItemProps {
  // key: number;
  heading: string;
  emoji: string;
  options: Array<string>;
  hidden: string;
  // toggleAdvancedHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const OptionsItem: React.FC<OptionsItemProps> = ({
  heading,
  emoji,
  options,
  hidden,
}): JSX.Element => {
  const [openSubOptions, setOpenSubOptions] = useState(false);
  let optionsArr: Array<string> = [];
  for (let index = 0; index < options.length; index++) {
    if (index < options.length) {
      optionsArr.push(options[index]);
    }
  }

  let optionsView: Array<JSX.Element> = [];
  for (const index in optionsArr) {
    optionsView.push(<p className="checkBox">{optionsArr[index]}</p>);

    let optionsArrTest: Array<JSX.Element> = [];
    options.forEach((option) => optionsArrTest.push(<p>{option}</p>));
  }

  return (
    <>
      <div
        className="OptionsItemBox"
        onClick={() => setOpenSubOptions(!openSubOptions)}
      >
        <div className="emoji">{emoji}</div>
        <div className={`optionHeading ${hidden}`}>{heading}</div>
        <button className={`arrowDown ${hidden}`}></button>
        <br />
      </div>

      <div>
        <div
          className={
            openSubOptions ? "multipleSelection" : "multipleSelection hidden"
          }
        >
          <div className="checkBoxes">
            <div>{optionsView}</div>

            {/* <label htmlFor="first">
              <input type="checkbox" id="first" />
              {optionsView}
            </label>
            <label htmlFor="second">
              <input type="checkbox" id="second" />
              checkBox2
            </label> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionsItem;
