import './CategoryItem.css';
import '../variables.css';
import { useState } from 'react';

export interface CategoryItemProps {
  heading: string;
  icon: JSX.Element;
  optionsSetter: (key: string, value: boolean) => void;
  checkedFilters: Omit<Map<string, boolean>, 'set' | 'clear' | 'delete'>;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  heading,
  icon,
  optionsSetter,
  checkedFilters,
}): JSX.Element => {
  // Setup states
  // const [displaySubOptions, setDisplaySubOptions] = useState(false);

  // Instantiate options view
  let categoryOptions: Array<JSX.Element> = [];

  // Populate 'category options'
  checkedFilters.forEach((value, key) => {
    let option_hidden_state: boolean = false;

    categoryOptions.push(
      <div
        hidden={option_hidden_state}
        className="checkbox-single_submenu"
        key={key}
      >
        <label className="custom-checkmark">
          <input
            type="checkbox"
            name={key}
            onChange={e => {
              const target: HTMLInputElement = e.target as HTMLInputElement;
              optionsSetter(target.name, target.checked);
            }}
            checked={value}
          />
          {key}
        </label>
      </div>
    );
  });

  return (
    <>
      {/* <div
        className={
          displaySubOptions ? `CategoryItemBox open` : `CategoryItemBox`
        }
        onClick={() => setDisplaySubOptions(!displaySubOptions)}
      > */}
      <div className="CategoryItemBox">
        <div className="category-heading-container">
          <div className="icon-categories">{icon}</div>

          <div className={`optionHeading`}>{heading}</div>
        </div>
        <div className="checkboxes_submenu">{categoryOptions}</div>
      </div>
    </>
  );
};

export default CategoryItem;
