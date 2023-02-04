import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to expense tracker</h1>
      <span>
        Your profile is not updated <Link to="/update"> Update Now</Link>
      </span>
    </div>
  );
};
export default Welcome;
