import React, { useRef, useEffect } from "react";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";

function Profile() {
  const inputNameRef = useRef();
  const inputProfileRef = useRef();

  const token = useSelector((state) => state.authentication.token);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredProfile = inputProfileRef.current.value;

    //optional:add validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCs1zdQMstoPmRG4AjfS4JwQfNMW7HsMBE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredProfile,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log("recieved data", data);
      })
      .catch((error) => {
        alert("failed to update profile");
      });
  };

  const gettingData = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCs1zdQMstoPmRG4AjfS4JwQfNMW7HsMBE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: token }),
      }
    )
      .then((res) => {
        console.log("Getting data", res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log("...", data);
        if (data.users[0].displayName) {
          inputNameRef.current.value = data.users[0].displayName;
          inputProfileRef.current.value = data.users[0].photoUrl;
        } else {
          inputNameRef.current.value = "";
          inputProfileRef.current.value = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(gettingData, []);

  return (
    <section className={classes.head}>
      <div className={classes.control}>
        <h3>Winners never quite , Quitteres never win</h3>
        <span>
          Your profile is 69% completed. A complete profile has <br /> higher
          chances of landing a job. <button>Complete now</button>
        </span>
      </div>

      <div className={classes.control1}>
        <h1>
          Contact Details <button className={classes.cancel}>Cancel</button>
        </h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="name"> Full Name</label>
          <input type="text" id="name" required ref={inputNameRef} />
          <label htmlFor="profile">Profile Photo URL</label>
          <input type="url" id="url" required ref={inputProfileRef} /> <br />
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
