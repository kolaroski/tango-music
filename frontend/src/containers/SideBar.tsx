import { useState } from "react";
import OptionsItem from "../components/OptionsItem";
import Button from "../components/Button";
import SideBarToggle from "../components/SideBarToggle";
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
    emoji: string;
    heading: string;
    optionsCoreItem: OptionsCoreItem;

  }> = [
    {
      emoji: "🎻 ",
      heading: "Select orchestra",
      optionsCoreItem: orchestrasOptions
    },
    {
      emoji: "🎙 ",
      heading: "Select singer/s",
      optionsCoreItem: singersOptions
    },
    {
      emoji: "🎶 ",
      heading: "Select style",
      optionsCoreItem: stylesOptions
    },
    {
      emoji: "🎞 ",
      heading: "Select period",
      optionsCoreItem: periodsOptions
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
            option: { emoji: string; heading: string; optionsCoreItem: OptionsCoreItem},
            index: number
          ) => (
            <OptionsItem
              key={index}
              emoji={option.emoji}
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
