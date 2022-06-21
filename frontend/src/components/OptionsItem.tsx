import "./OptionsItem.css";

export interface OptionsItemProps {
  // key: number;
  heading: string;
  emoji: string;
  options: string;
  hidden: string;
  advancedHidden: string;
  toggleAdvancedHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const OptionsItem: React.FC<OptionsItemProps> = ({
  // key,
  heading,
  emoji,
  options,
  hidden,
  advancedHidden,
  toggleAdvancedHandler,
}): JSX.Element => {
  return (
    <>
      <div className="OptionsItemBox" onClick={toggleAdvancedHandler}>
        <div className="emoji">{emoji}</div>
        <div className={`optionHeading ${hidden}`}>{heading}</div>
        <button className={`arrowDown ${hidden}`}></button>
        <br />
      </div>
      <div>
        <p className={advancedHidden}>{options}</p>
      </div>
      {/* <div>
        <div
          // id={`option{key}`}
          // id="options2"
          className={`multipleSelection ${advancedHidden}`}
        >
          <div id="checkBoxes">
            <label htmlFor="first">
              <input type="checkbox" id="first" />
              checkBox1
            </label>
            <label htmlFor="second">
              <input type="checkbox" id="second" />
              checkBox2
            </label>
            <label htmlFor="third">
              <input type="checkbox" id="third" />
              checkBox3
            </label>
            <label htmlFor="fourth">
              <input type="checkbox" id="fourth" />
              checkBox4
            </label>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OptionsItem;
