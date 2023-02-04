
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./routes/SignUp";
import Home from "./routes/Home";
import Welcome from "./routes/Welcome";
import UpdatePage from "./routes/UpdatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/" element={<Signup />}/>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/update" element={<UpdatePage />}/>
      </Routes>
    </>
  );
}

export default App;
