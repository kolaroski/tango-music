import { useState } from "react";
import OptionsItem from "../components/OptionsItem";
import Button from "../components/Button";
import SideBarToggle from "../components/SideBarToggle";
import OrchestraIcon from "../assets/OrchestraIcon";
import SingersIcon from "../assets/SingersIcon";
import StyleIcon from "../assets/StyleIcon";
import PeriodIcon from "../assets/PeriodIcon";
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
  const [inactive, setInactive] = useState(false);
  const toggleHandler = () => setInactive(!inactive);

  const toggleCollapsedClass = inactive ? "collapsed" : "";
  const toggleHiddenClass = inactive ? "hidden" : "";

  const optionsInput: Array<{
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
    <div className={`sideBarBox ${toggleCollapsedClass}`}>
      <div className={`optionsContainer ${toggleCollapsedClass}`}>
        <h3 className="sideBarHeading">
          {inactive ? "🔍" : "Advanced Search"}
        </h3>

        {optionsInput.map(
          (
            option: {
              icon: JSX.Element;
              heading: string;
              optionsCoreItem: OptionsCoreItem;
            },
            index: number
          ) => (
            <OptionsItem
              key={index}
              icon={option.icon}
              heading={option.heading}
              options={option.optionsCoreItem.options}
              optionsSetter={option.optionsCoreItem.optionsSetter}
              hidden={toggleHiddenClass}
            />
          )
        )}
      </div>

      <Button
        buttonName={`${inactive ? "" : "Search"}`}
        className={`btn searchBtn ${toggleCollapsedClass}`}
        imgSrc={require("../assets/searchImg.svg")}
      />

      <Button
        buttonName={`${inactive ? "" : "Reset all filters"}`}
        className={`btn resetBtn ${toggleCollapsedClass}`}
        imgSrc={require("../assets/reloadImg.svg")}
      />

      <SideBarToggle
        toggleHandler={toggleHandler}
        imgSrc={`${inactive ? "arrowRight" : "arrowLeft"}`}
        textToggle={`${inactive ? "" : "Hide sidebar"}`}
      />
    </div>
  );
};

export default SideBar;
