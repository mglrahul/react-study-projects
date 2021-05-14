import React from "react";

import HeaderCartButton from "./HeaderCartButton";
import MealImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onShowCart={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={MealImage} alt={"A table full of delicious food"} />
      </div>
    </React.Fragment>
  );
};

export default Header;
