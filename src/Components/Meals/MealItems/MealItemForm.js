import { React, useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);

  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +amountRef.current.value.trim();

    console.log("ref:", enteredAmount);
    if (enteredAmount.length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label={"Amount"}
        input={{
          ref: amountRef,
          id: "amount_" + props.id,
          type: "Number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button className={classes.button}> + Add</button>
      {!isAmountValid && <p>Please enter a value from (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
