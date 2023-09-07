import React, { useEffect, useState } from "react";
import classes from "./ExpensesList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/Expense";

const ExpenseList = (props) => {

  const [receivedExpense, setReceivedExpense] = useState([]);

  const dispatch = useDispatch();

  
  // Get the expenses list data using selector and update state with it on component mounting or
  
 

  const emailId = useSelector((state) => state.authentication.userEmail);
  const email = emailId.replace(/[@.]/g, "");

  useEffect(() => {
    fetch(
      `https://http-authentication1-default-rtdb.firebaseio.com/${email}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error.message);
          });
        }
      })

      .then((data) => {
        setReceivedExpense(data);
        dispatch(expenseActions.recivedData(data));
      });
  }, [dispatch]);

  const deleteHandler = async (key) => {
    console.log("key", key);
    const response = await fetch(
      `https://http-authentication1-default-rtdb.firebaseio.com/${email}/${key}.json`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setReceivedExpense((prevExpenses) => {
        const updatedExpenses = { ...prevExpenses };
        delete updatedExpenses[key];
        return updatedExpenses;
      });
    }
  };

  const editHandler = async (key) => {
    const response = await fetch(
      `https://http-authentication1-default-rtdb.firebaseio.com/${email}/${key}.json`
    );
    const data = await response.json();

    console.log(data);

    const { amount, description, category } = receivedExpense[key];

    const obj = {
      amount: amount,
      description: description,
      category: category,
    };
    props.onEdit(obj);
    deleteHandler(key);
  };

  let totalAmount = 0;

  if (receivedExpense) {
    Object.values(receivedExpense).forEach((expense) => {
      totalAmount += +expense.amount;
    });
  } else {
    totalAmount = 0;
  }

  if (totalAmount > 10000) {
    dispatch(expenseActions.Premium());
  } else {
    dispatch(expenseActions.notPremium());
  }

  return (
    <React.Fragment>
      <ul className={classes.ul}>
        {receivedExpense ? (
          Object.keys(receivedExpense).map((key) => (
            <ul key={key}>
              <li>{receivedExpense[key].amount}/-</li>
              <li>{receivedExpense[key].description}</li>
              <li>{receivedExpense[key].category}</li>
              <div className={classes.actions}>
                <button
                  className={classes.edit}
                  onClick={() => editHandler(key)}
                >
                  Edit
                </button>
                <button
                  className={classes.delete}
                  onClick={() => deleteHandler(key)}
                >
                  Delete
                </button>
              </div>
            </ul>
          ))
        ) : (
          <h2
            style={{
              textAlign: "center",
              padding: "50px",
            }}
          >
            No data found{" "}
          </h2>
        )}
      </ul>
      <div>
        <h1>Total Amount:{totalAmount}</h1>
      </div>
    </React.Fragment>
  );
};

export default ExpenseList;
