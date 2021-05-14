import React from "react";

import AvailableMeals from "./AvailableMeals";
import MealsSummery from "./MealsSummery";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummery />
      <AvailableMeals />
    </React.Fragment>
  );
};

export default Meals;
