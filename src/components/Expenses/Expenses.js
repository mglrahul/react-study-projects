import React from 'react';
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

import './Expenses.css';

const Expenses = (props) => {
  return props.expenses.map((item) => {
    return (
      <Card className='expenses'>
        <ExpenseItem
          key={item.id}
          date={item.date}
          title={item.title}
          amount={item.amount}
        />
      </Card>
    );
  });
}

export default Expenses;
