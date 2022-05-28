import "./sideBar.css";

function SideBar() {
  return (
    <div className="sideBarBox fontColorTest">
      <h1>side bar</h1>
      <ul>
        <li style={{ color: "green" }}>option</li>
        <li className="fontColorTest">option</li>
        <li>option</li>
        <li>option</li>
        <li>option</li>
        <li>option</li>
        <li>option</li>
        <li>option</li>
      </ul>
    </div>
  );
}

export default SideBar;
