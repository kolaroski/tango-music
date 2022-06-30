import "./OptionsItem.css";
import { useState } from "react";

export interface OptionsItemProps {
  heading: string;
  emoji: string;
  options: Array<string>;
  optionsSetter: (key: string, value: boolean) => void;
  hidden: string;
}

const OptionsItem: React.FC<OptionsItemProps> = ({
  heading,
  emoji,
  options,
  optionsSetter,
  hidden,
}): JSX.Element => {
  // Setup states
  const [openSubOptions, setOpenSubOptions] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  // Instantiate options view
  let optionsView: Array<JSX.Element> = [];
  
  // Populate options View
  for (const option of options) {
    if (!option.toLowerCase().includes(searchText.toLowerCase())) {
      continue;
    }
    optionsView.push(
      <div>
        <label>
          <input type="checkbox" name={option} onClick={(e)=>{
            const target: HTMLInputElement = e.target as HTMLInputElement
            optionsSetter(target.name, target.checked)
          }}/>
          {option}
        </label>
      </div>
    );
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
            <input type="text" onChange={(e)=>{
            const target: HTMLInputElement = e.target as HTMLInputElement
            setSearchText(target.value)
          }}/>
            <div>{optionsView}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionsItem;
