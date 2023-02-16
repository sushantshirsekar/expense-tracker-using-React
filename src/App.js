import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./routes/SignUp";
import Welcome from "./routes/Welcome";
import UpdatePage from "./routes/UpdatePage";
import ForgotPassword from "./routes/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./routes/ErrorPage";
import { useEffect } from "react";
import { expenseData} from "./store/expense-actions";
import { authActions } from "./store/auth-reducer";
import { premiumActions } from "./store/expense-reducer";
import { AddExpenseActions } from "./store/addExpense-reducer";

let initState = true;

function App() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.addExpense);

  
useEffect(()=> {
  let token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.login(token));
    }

}, [dispatch])

  useEffect(() => {
    if (initState) {
      initState = false;
      return;
    }
    // let theme = localStorage.getItem('theme'); 
    // if(theme === 'bg-dark'){
    //   console.log('dark');
    //   dispatch(premiumActions.activatePremium());
    // }else{

    // }
    if(expenses.totalAmount >= 10000){
      dispatch(premiumActions.activePremium());
      
    }else{
      dispatch(premiumActions.deactivePremium());
      dispatch(premiumActions.deactivatePremium());
      dispatch(AddExpenseActions.desetPremium()); 
    }
    if(expenses.changed){
      dispatch(expenseData(expenses));
    }
  }, [expenses, dispatch]);

  let auth = useSelector((state) => state.auth.isAuthenticated);
  let theme = useSelector((state)=> state.premium.theme);
  return (
    <div className={theme}>
      <Routes className={theme}>
        <Route path="/" element={<Signup />} />
        {auth && <Route path="/welcome" element={<Welcome />} />}
        {auth && <Route path="/update" element={<UpdatePage />} />}
        {!auth && <Route path="/forgotpassword" element={<ForgotPassword />} />}
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
