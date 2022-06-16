<<<<<<< HEAD
import "./CardList.css";
import React from "react";
import { Card } from "../components/Card";

export interface CardListProps {
  titles: Array<string>;
}

export const CardList: React.FC<CardListProps> = ({ titles }): JSX.Element => {
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(3);
  let currentTitles: Array<string> = [];
  for (let index = start; index < end; index++) {
    if (index < titles.length) {
      currentTitles.push(titles[index]);
    }
  }
  let cards: Array<JSX.Element> = [];
  for (const index in currentTitles) {
    cards.push(<Card key={index} title={currentTitles[index]} />);
  }
  return (
    <div className="CardList">
      {" "}
      <button
        onClick={() => {
          if (start > 0) {
            setStart(start - 1);
          }
          if (end > 3) {
            setEnd(end - 1);
          }
        }}
      >
        ◀
      </button>
      {cards}{" "}
      <button
        onClick={() => {
          if (start + 3 < titles.length) {
            setStart(start + 1);
          }
          if (end < titles.length) {
            setEnd(end + 1);
          }
        }}
      >
        ▶
      </button>{" "}
    </div>
  );
};
=======
import "./CardList.css"
import React from "react"
import {Card} from "../components/Card"

export interface CardListProps {
    titles: Array<string>
}


export const CardList: React.FC<CardListProps> = ({titles}): JSX.Element => {
    const [start, setStart] = React.useState(0)
    const [end, setEnd] = React.useState(3)
    let currentTitles: Array<string> = []
    for (let index = start; index < end; index++) {
        if (index < titles.length){
            currentTitles.push(titles[index])
        }
    }
    let cards: Array<JSX.Element> = []
    for (const index in currentTitles) {
        cards.push(<Card key={index} title={currentTitles[index]}/>)
    }
    return <div className="CardList"> {cards} <button onClick={ () => {
        if ((start + 3) < titles.length){
            setStart(start + 1);
        }
        if (end < titles.length)
        {
            setEnd(end + 1)
        }
    }}> Next cards</button> </div>
}
>>>>>>> backend
