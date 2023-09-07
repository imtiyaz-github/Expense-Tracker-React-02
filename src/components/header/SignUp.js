import React, { useState, Fragment, useRef } from "react";
import classes from "./SignUp.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../store/Authentication";

function Signup() {
  const emailInputRef = useRef();
  const passwordInputref = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const resetpasswordHandler = () => {
    history.push("/resetpassword");
    console.log("fogetted password");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputref.current.value;

    //optional:add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKkxZtSs419UvyIfm6XA59aP15papa6MQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKkxZtSs419UvyIfm6XA59aP15papa6MQ";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("getdata", data);
        // authCtx.login(data.idToken,data.email)
        dispatch(
          authActions.login({
            token: data.idToken,
            email: data.email,
          })
        );
        history.replace("/welcomescreen");
      })
      .catch((error) => {
        console.log("failed");
        alert(error.message);
      });
  };

  return (
    <Fragment>
      <section className={classes.head}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputref}
            />
          </div>

          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Sending request..!</p>}

            <div>
              {isLogin && (
                <button type="submit" onClick={resetpasswordHandler}>
                  Forget Password?
                </button>
              )}
            </div>

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
}

export default Signup;
