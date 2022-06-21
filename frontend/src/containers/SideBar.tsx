import { useState } from "react";
import OptionsItem from "../components/OptionsItem";
import Button from "../components/Button";
import SideBarToggle from "../components/SideBarToggle";
import "./SideBar.css";

const SideBar: React.FC = (): JSX.Element => {
  const [inactive, setInactive] = useState(false);
  const toggleHandler = () => setInactive(!inactive);

  const toggleCollapsedClass = inactive ? "collapsed" : "";
  const toggleHiddenClass = inactive ? "hidden" : "";

  // const [open, setOpen] = useState(false);
  // const toggleAdvancedOptions = open ? "" : "hidden";
  // const toggleAdvancedHandler = (index: number) => {
  //   setOpen(!open);
  // };

  const optionsInput: Array<{
    emoji: string;
    heading: string;
    options: string;
  }> = [
    {
      emoji: "🎻 ",
      heading: "Select orchestra",
      options: "Di Sarli",
    },
    {
      emoji: "🎞 ",
      heading: "Select period",
      options: "Golden era",
    },
    {
      emoji: "🎶 ",
      heading: "Select style",
      options: "Vals",
    },
    {
      emoji: "🎙 ",
      heading: "Select singer/s",
      options: "Rufino",
    },
  ];

  return (
    <div className={`sideBarBox ${toggleCollapsedClass}`}>
      <div className={`optionsContainer ${toggleCollapsedClass}`}>
        <h3 className="sideBarHeading">
          {inactive ? "🔍" : "🔍 Advanced Search"}
        </h3>

        {optionsInput.map(
          (
            option: { emoji: string; heading: string; options: string },
            index: number
          ) => (
            <OptionsItem
              key={index}
              emoji={option.emoji}
              heading={option.heading}
              options={option.options}
              hidden={toggleHiddenClass}
              // advancedHidden={toggleAdvancedOptions}
              // toggleAdvancedHandler={toggleAdvancedHandler}
              // toggleAdvancedHandler={() => toggleAdvancedHandler(index)}
            />
          )
        )}
      </div>

      <Button
        buttonName={`${inactive ? "" : "Search"}`}
        className={`btn searchBtn ${toggleCollapsedClass}`}
        imgSrc={require("../utils/searchImg.svg")}
      />

      <Button
        buttonName={`${inactive ? "" : "Reset all filters"}`}
        className={`btn resetBtn ${toggleCollapsedClass}`}
        imgSrc={require("../utils/reloadImg.svg")}
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
