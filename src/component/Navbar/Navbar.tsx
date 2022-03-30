import React from "react";
import "./Navbar.scss";

const Navbar = () => (
  <nav className="nav">
    <h3>I am navbar</h3>
    <button className="btn-primary m-1" type="button">
      Click
    </button>
    <ul>
      <li>Hello</li>
      <li>world</li>
    </ul>
  </nav>
);

export default Navbar;
