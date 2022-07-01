import { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import Button from "../components/Button";
import SideBarToggle from "../components/SideBarToggle";
import {
  OrchestraIcon,
  SingersIcon,
  StyleIcon,
  PeriodIcon,
} from "../assets/SideBarIcons";
import "./SideBar.css";

interface OptionsCoreItem {
  options: Array<string>;
  optionsSetter: (key: string, value: boolean) => void;
}

export interface SideBarProps {
  orchestrasOptions: OptionsCoreItem;
  singersOptions: OptionsCoreItem;
  stylesOptions: OptionsCoreItem;
  periodsOptions: OptionsCoreItem;
}

const SideBar: React.FC<SideBarProps> = ({
  orchestrasOptions,
  singersOptions,
  stylesOptions,
  periodsOptions,
}): JSX.Element => {
  // const [inactive, setInactive] = useState(false);
  // const toggleHandler = () => setInactive(!inactive);

  // const toggleCollapsedClass = inactive ? "collapsed" : "";
  // const toggleHiddenClass = inactive ? "hidden" : "";

  const categoriesArr: Array<{
    icon: JSX.Element;
    heading: string;
    optionsCoreItem: OptionsCoreItem;
  }> = [
    {
      icon: <OrchestraIcon color="#055a5f" size={25} />,
      heading: "Select orchestra",
      optionsCoreItem: orchestrasOptions,
    },
    {
      icon: <SingersIcon color="#055a5f" size={25} />,
      heading: "Select singer/s",
      optionsCoreItem: singersOptions,
    },
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

        {/* <div className={`sideBarBox ${toggleCollapsedClass}`}>
      <div className={`categoriesContainer ${toggleCollapsedClass}`}>
        <h3 className="sideBarHeading">
          {inactive ? "🔍" : "Advanced Search"}
        </h3> */}

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
              options={option.optionsCoreItem.options}
              optionsSetter={option.optionsCoreItem.optionsSetter}
            />
          )
        )}
      </div>

      <Button
        buttonName="Search"
        className="btn searchBtn"
        imgSrc={require("../assets/searchImg.svg")}
      />

      <Button
        buttonName="Reset all filters"
        className="btn resetBtn"
        imgSrc={require("../assets/reloadImg.svg")}
      />
    </div>
  );
};

export default SideBar;
