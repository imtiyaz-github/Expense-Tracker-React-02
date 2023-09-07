import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./WelcomeScreen.module.css";
import ExpensesList from "./ExpensesList";
import AddExpenses from "./AddExpenses";
import { authActions } from "../store/Authentication";
import { expenseActions } from "../store/Expense";
import { saveAs } from "file-saver";

const WelcomeScreen = () => {

  // const ctx = useContext(AuthContext);

  const history = useHistory();

  const [editingId, setEdit] = useState(null);

  const recevedData = useSelector((state) => state.expense?.data);

  const dispatch = useDispatch();

  const premium = useSelector((state) => state.expense.showPremium);

  const email = useSelector((state) => state.authentication.userEmail);


  // const showDark = useSelector((state) => state.expense.showDark);
  


  let [isPremiumClicked, setIsPremiunClicked] = useState(false);

  const token = useSelector((state) => state.authentication.token);

  const verifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCs1zdQMstoPmRG4AjfS4JwQfNMW7HsMBE",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = await res.json();
          if (data.error.messsge) {
            alert(data.error.messsge);
          }
        }
      })
      .then((data) => {
        console.log("recevied data", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("darkTheme");
    localStorage.removeItem("isPremiumClicked");
    history.replace("/");
  };

  const downloadFile = () => {
    const csv =
      "Category,Description,Amount\n" +
      Object.values(recevedData)
        .map(
          ({ category, description, amount }) =>
            `${category},${description},${amount}`
        )
        .join("\n");

    //create a new blob with csv data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    //save the blob as a file with name expensese.csv
    saveAs(blob, "expenses.csv");
  };

  
  const changeToDark = () => {
    dispatch(expenseActions.togggle());
  };


  useEffect(() => {
    const premiumClickedStatus = localStorage.getItem("isPremiumClicked");
    if (premiumClickedStatus) {
      setIsPremiunClicked(JSON.parse(premiumClickedStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isPremiumCliked", JSON.stringify(isPremiumClicked));
  }, [isPremiumClicked]);


  const activePremium = () => {
    localStorage.setItem("isPremiumCliked", true);
    window.location.reload();
  };

  const editHandler = (id) => {
    console.log(" recevide edited id", id);
    setEdit(id);
  };

  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.left}>Welcome to expance tracker!!!!</div>
        <button
          type="submit"
          onClick={verifyEmailHandler}
          className={classes.verifyEmail}
        >
          Verify Email
        </button>
        {premium && (
          <button className={classes.premium} onClick={activePremium}>
            Active Premium
          </button>
        )}
        <button className={classes.logout} onClick={logoutHandler}>
          Logout
        </button>

        {!premium  && (
          <button className={classes.toggle} onClick={changeToDark}>
            Toggle dark/light Theme
          </button>
        )}

        {premium && isPremiumClicked && (
          <button className={classes.download} onClick={downloadFile}>
            Dowload Expense
          </button>
        )}

        <div className={classes.right}>
          Your profile is incomplete.
          <Link to="/welcomescreen/profile">Complete now</Link>
        </div>
      </div>

      <AddExpenses editingId={editingId} />
      <ExpensesList onEdit={editHandler} />
    </Fragment>
  );
};

export default WelcomeScreen;
