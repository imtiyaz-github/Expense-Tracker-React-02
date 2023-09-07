import React, { Fragment, useEffect, useRef } from "react";
import classes from "./AddExpenses.module.css";
import { useSelector } from "react-redux";

const AddExpenses = (props) => {
  
  const inputPricRef = useRef();
  const inputDesRef = useRef();
  const inputCatRef = useRef();

  const emailId = useSelector((state) => state.authentication.userEmail);
  const email = emailId.replace(/[@.]/g, "");

  useEffect(() => {
    if (props.editItem) {
      inputPricRef.current.value = props.editItem.amount;
      inputDesRef.current.value = props.editItem.description;
      inputCatRef.current.value = props.editItem.category;
    }
  }, [props.editItem]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredPrice = inputPricRef.current.value;
    const enteredDes = inputDesRef.current.value;
    const enteredCat = inputCatRef.current.value;

    const newExpense = {
      amount: enteredPrice,
      description: enteredDes,
      category: enteredCat,
    };

    console.log(newExpense);

    try {
      const response = await fetch(
        `https://http-authentication1-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();

    inputPricRef.current.value = "";
    inputDesRef.current.value = "";
    inputCatRef.current.value = "";
  };

  return (
    <Fragment>
      <div className={classes.expenses}>
        <form onSubmit={submitHandler}>
          <div className={classes.expenses1}>
            <label htmlFor="money">Money</label>
            <input type="number" id="money" ref={inputPricRef} />
          </div>
          <div className={classes.expenses2}>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" ref={inputDesRef} />
          </div>
          <div className={classes.expenses3}>
            <label htmlFor="category">Category</label>
            <select id="category" ref={inputCatRef}>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="mobile">Mobiles</option>
              <option value="electronics">Electricals</option>
            </select>
          </div>

          <button type="submit" className={classes.button}>
            Add Expenses
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddExpenses;
