import { useState } from "react";
import OptionsItem from "../components/OptionsItem";
import Button from "../components/Button";
import SideBarToggle from "../components/SideBarToggle";
import "./SideBar.css";

export interface SideBarProps {
  allOrchestras: Array<string>;
  allSingers: Array<string>;
}

const SideBar: React.FC<SideBarProps> = ({
  allOrchestras,
  allSingers,
}): JSX.Element => {
  const [inactive, setInactive] = useState(false);
  const toggleHandler = () => setInactive(!inactive);

  const toggleCollapsedClass = inactive ? "collapsed" : "";
  const toggleHiddenClass = inactive ? "hidden" : "";

  const optionsInput: Array<{
    emoji: string;
    heading: string;
    options: Array<string>;
  }> = [
    {
      emoji: "🎻 ",
      heading: "Select orchestra",
      options: [allOrchestras[10], allOrchestras[27], allOrchestras[39]],
    },
    {
      emoji: "🎞 ",
      heading: "Select period",
      options: ["Guardia vieja", "Golden era", "Contemporary"],
    },
    {
      emoji: "🎶 ",
      heading: "Select style",
      options: ["Vals", "Tango", "Milonga"],
    },
    {
      emoji: "🎙 ",
      heading: "Select singer/s",
      options: [allSingers[190], allSingers[199], allSingers[280]],
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
            option: { emoji: string; heading: string; options: Array<string> },
            index: number
          ) => (
            <OptionsItem
              key={index}
              emoji={option.emoji}
              heading={option.heading}
              options={option.options}
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
