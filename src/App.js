
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./routes/SignUp";
import Home from "./routes/Home";
import Welcome from "./routes/Welcome";
import UpdatePage from "./routes/UpdatePage";
import ForgotPassword from "./routes/ForgotPassword";
import { useSelector } from "react-redux";
import ErrorPage from "./routes/ErrorPage";

function App() {
  const auth = localStorage.getItem('token'); 
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}/>
        {!auth &&<Route path="/" element={<Signup />}/>}
        {auth && <Route path="/welcome" element={<Welcome />} />}
        {auth && <Route path="/update" element={<UpdatePage />}/>}
        {!auth && <Route path="/forgotpassword" element={<ForgotPassword />}/>}
        <Route path="*" element={<ErrorPage />}></Route>
        
      </Routes>
    </>
  );
}

export default App;
