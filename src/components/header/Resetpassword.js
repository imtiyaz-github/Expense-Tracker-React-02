import React, { useRef } from "react";
import classes from "./ReserPassword.module.css";

function Resetpassword() {

  const inputEmailRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();


    const enteredEmail = inputEmailRef.current.value;
    
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCs1zdQMstoPmRG4AjfS4JwQfNMW7HsMBE",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => alert(data.error.message));
        }
      })
      .then((data) => {
        console.log("received data ", data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.reset}>
      <form action="" onSubmit={submitHandler} className={classes.form}>
        <h1>Reset Password</h1>
        <label htmlFor="">Enter the Email Which You Have Registered:</label>
        <input type="text" ref={inputEmailRef} id="email" required />
        <button>Send Link</button>
      </form>
    </div>
  );
}

export default Resetpassword;
