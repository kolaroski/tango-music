import "./CategoryItem.css";
import "../variables.css";
import { useState } from "react";

export interface CategoryItemProps {
  heading: string;
  icon: JSX.Element;
  options: Array<string>;
  optionsSetter: (key: string, value: boolean) => void;
  isChecked: Omit<Map<string, boolean>, "set" | "clear" | "delete">;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  heading,
  icon,
  options,
  optionsSetter,
  isChecked,
}): JSX.Element => {
  // Setup states
  const [displaySubOptions, setDisplaySubOptions] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  // Instantiate options view
  let viewOptions: Array<JSX.Element> = [];

  // Populate 'view options'
  for (const option of options) {
    let option_hidden_state: boolean = false;

    if (!option.toLowerCase().includes(searchText.toLowerCase())) {
      option_hidden_state = true;
    }
    viewOptions.push(
      <div
        hidden={option_hidden_state}
        className="checkbox-single_submenu"
        key={option}
      >
        <label className="custom-checkmark">
          <input
            type="checkbox"
            name={option}
            onChange={(e) => {
              const target: HTMLInputElement = e.target as HTMLInputElement;
              optionsSetter(target.name, target.checked);
            }}
            checked={isChecked.has(option) && isChecked.get(option)}
          />
          {option}
        </label>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          displaySubOptions ? `CategoryItemBox open` : `CategoryItemBox`
        }
        onClick={() => setDisplaySubOptions(!displaySubOptions)}
      >
        <div className="icon-categories">{icon}</div>

        <div className={`optionHeading`}>{heading}</div>
        <button className={`arrowDown`}></button>
        <br />
      </div>

      <div>
        <div
          className={displaySubOptions ? "box_submenu" : "box_submenu hidden"}
        >
          <div>
            <input
              type="text"
              className="search-input_submenu"
              value={searchText}
              onChange={(e) => {
                const target: HTMLInputElement = e.target as HTMLInputElement;
                setSearchText(target.value);
              }}
              placeholder=" Start typing for more options..."
            />
            <div className="checkboxes_submenu">{viewOptions}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
