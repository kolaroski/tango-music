import React from "react";
import "./Card.css"

export interface CardProps {
    title: string,
}


export const Card: React.FC<CardProps> = ({title}): JSX.Element => {
    return <div className="Card">
      <div className="caption">
        {title}
      </div>
    </div>
};

