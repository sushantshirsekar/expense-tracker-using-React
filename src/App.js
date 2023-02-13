import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./routes/SignUp";
import Home from "./routes/Home";
import Welcome from "./routes/Welcome";
import UpdatePage from "./routes/UpdatePage";
import ForgotPassword from "./routes/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./routes/ErrorPage";
import { Fragment, useEffect } from "react";
import { authActions } from "./store/auth-reducer";
import { premiumActions } from "./store/expense-reducer";

function App() {
  const dispatch = useDispatch(); 
  let logInId = localStorage.getItem('token'); 
  let storagetheme = localStorage.getItem('theme'); 
  useEffect(()=> {
    if(logInId){
      dispatch(authActions.login(logInId)); 
    }
    let totalAmount = localStorage.getItem('total'); 
    if(totalAmount >= 10000){
      dispatch(premiumActions.activePremium()); 
    }else{
      dispatch(premiumActions.deactivePremium()); 
    }
    if(storagetheme === 'bg-dark'){
     dispatch(premiumActions.activatePremium());  
    }
    fetch('', {
      method: "GET"
    }).then((res)=>{
      if(res.ok){
        return res.json(); 
      }
    }).then((data)=>{
      console.log(data);
    })
  }, [])

  let auth = useSelector((state) => state.auth.isAuthenticated);
  let theme = useSelector(state => state.premium.theme); 
  return (
    <div className= {theme}>
    {console.log(theme)}
      <Routes className = {theme}>
        <Route path="/home" element={<Home />} />
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
