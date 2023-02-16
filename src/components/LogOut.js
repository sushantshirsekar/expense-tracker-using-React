import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddExpenseActions } from "../store/addExpense-reducer";
import { authActions } from "../store/auth-reducer";
import { premiumActions } from "../store/expense-reducer";

const Logout = () => {
  const nav = useNavigate();
  const dispatch = useDispatch(); 
  const logOuthandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("photoUrl");
    localStorage.removeItem("emailVerified");
    localStorage.removeItem("displayName");
    localStorage.removeItem('email');
    dispatch(premiumActions.deactivatePremium());
    dispatch(authActions.logout());
    dispatch(AddExpenseActions.resetExpenses());
    nav("/");
  };
  return <Button variant="secondary" className="py-1 mt-2" onClick={logOuthandler}>Logout</Button>;
};
export default Logout;
