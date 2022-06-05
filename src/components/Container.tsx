import React from "react";

import "./container.css";

type ContainerProps = {
  className: string;
  children: JSX.Element;
};

const Container = ({ className, children }: ContainerProps) => {
  const classes = "borderBox " + className;
  return <div className={classes}>{children}</div>;
};

export default Container;
