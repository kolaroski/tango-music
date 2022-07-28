import CategoryItem from "../components/CategoryItem";
import Button from "../components/Button";
import {
  StyleIcon,
  PeriodIcon,
} from "../assets/SideBarIcons";
import "./SideBar.css";

interface OptionsCoreItem {
  optionsSetter: (key: string, value: boolean) => void;
  checkedFilters: Omit<Map<string, boolean>, "set" | "clear" | "delete">;
}

export interface SideBarProps {
  stylesOptions: OptionsCoreItem;
  periodsOptions: OptionsCoreItem;
  resetAllFilters: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  stylesOptions,
  periodsOptions,
  resetAllFilters,
}): JSX.Element => {
  const categoriesArr: Array<{
    icon: JSX.Element;
    heading: string;
    optionsCoreItem: OptionsCoreItem;
  }> = [
    {
      icon: <StyleIcon color="#055a5f" size={25} />,
      heading: "Select style",
      optionsCoreItem: stylesOptions,
    },
    {
      icon: <PeriodIcon color="#055a5f" size={25} />,
      heading: "Select period",
      optionsCoreItem: periodsOptions,
    },
  ];

  return (
    <div className={`sideBarBox`}>
      <div className={`categoriesContainer`}>
        <h3 className="sideBarHeading">Advanced Search</h3>

        {categoriesArr.map(
          (
            option: {
              icon: JSX.Element;
              heading: string;
              optionsCoreItem: OptionsCoreItem;
            },
            index: number
          ) => (
            <CategoryItem
              key={index}
              icon={option.icon}
              heading={option.heading}
              optionsSetter={option.optionsCoreItem.optionsSetter}
              checkedFilters={option.optionsCoreItem.checkedFilters}
            />
          )
        )}
      </div>
      <div className="buttons_sidebar">
        <Button
          buttonName="Search"
          className="btn searchBtn"
          imgSrc={require("../assets/searchImg.svg")}
        />

        <Button
          buttonName="Reset all filters"
          className="btn resetBtn"
          imgSrc={require("../assets/reloadImg.svg")}
          onClick={resetAllFilters}
        />
      </div>
    </div>
  );
};

export default SideBar;
