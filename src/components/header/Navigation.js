import React from "react";
import classes from "./Navigation.module.css";

function Navigation() {
  
  return (
    <>
      <nav className={classes.navbar}>
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>About Us</li>
        </ul>
      </nav>
      
    </>
  );
}

export default Navigation;
