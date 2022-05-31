import "./container.css";

//  !!! props is of 'any' type...
function Container(props) {
  const classes = "borderBox " + props.className;
  return <div className={classes}>{props.children}</div>;
}

// type Props = {
//   className: string;
//   children: JSX.Element;
// };

// const Container = ({ className, children }: Props) => {
//   const classes = "borderBox " + className;
//   return <div className={classes}>{children}</div>;
// };

export default Container;
