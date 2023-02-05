import React from "react";
import { Link } from "react-router-dom";
import Logout from "../components/LogOut";

const Welcome = () => {
  return (
    <div >
      <div className="d-flex mt-2">
        <h1 className="mx-5 px-5 ">Welcome to expense tracker</h1>
        <div>
        <Logout className="mx-5 px-5 mt-2"  />
        </div>
      </div>
      <span className="mx-5 px-5">
        Your profile is not updated <Link to="/update"> Update Now</Link>
      </span>
    </div>
  );
};
export default Welcome;
