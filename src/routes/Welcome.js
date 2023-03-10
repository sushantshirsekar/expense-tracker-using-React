import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/LogOut";
import AddExpense from "./AddExpense";
import { fetchData } from "../store/expense-actions";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";

const Welcome = () => {
  const dispatch = useDispatch();
  
  useEffect(()=> {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.login(token));
    }
    dispatch(fetchData());
  }, [dispatch])

  return (
    <div style={{height: '1000px'}}>
      <div className="d-flex mt-2 justify-content-center">
        <h1 className="mx-5 px-5 text-center">Welcome to expense tracker</h1>
        <div style={{display: 'flex-end'}}>
        <Logout   />
        </div>
        
      </div>
      
      <span className="mx-5 px-5 d-flex justify-content-center">
        Profile Update  <Link to="/update"> Update Now</Link>
      </span>
      <div>
        <AddExpense />
      </div>
      
    </div>
  );
};
export default Welcome;
