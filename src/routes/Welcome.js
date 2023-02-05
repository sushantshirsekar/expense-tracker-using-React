import React from "react";
import { Link } from "react-router-dom";
import Expense from "../components/Expense";
import Logout from "../components/LogOut";
import AddExpense from "./AddExpense";

const Welcome = () => {
  return (
    <div style={{height: '1000px'}}>
      <div className="d-flex mt-2">
        <h1 className="mx-5 px-5 ">Welcome to expense tracker</h1>
        <div>
        <Logout className="mx-5 px-5 mt-2"  />
        </div>
      </div>
      <span className="mx-5 px-5">
        Profile Update <Link to="/update"> Update Now</Link>
      </span>
      <div>
        <AddExpense />
      </div>
      <div>
        <Expense />
      </div>
    </div>
  );
};
export default Welcome;
