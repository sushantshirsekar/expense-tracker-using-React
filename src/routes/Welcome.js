import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const detailsHandler = () => {
    let storageId = localStorage.getItem("idToken");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBWGYRRzV87ZdrnvV_7QsU_lrt4uA9A2b4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: storageId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Registeration Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.users[0].displayName);
        console.log(data.users[0].photoUrl);
        localStorage.setItem('displayName', data.users[0].displayName)
        localStorage.setItem('photoUrl', data.users[0].photoUrl);
        console.log(data.users[0]); 
        console.log(data);
      });
  };
  return (
    <div>
      <h1>Welcome to expense tracker</h1>
      <span>
        Your profile is not updated{" "}
        <Link to="/update" onClick={detailsHandler}>
          {" "}
          Update Now
        </Link>
      </span>
    </div>
  );
};
export default Welcome;
