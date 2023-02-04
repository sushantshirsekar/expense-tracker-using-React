
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./routes/SignUp";
import Home from "./routes/Home";
import Welcome from "./routes/Welcome";

function App() {
  return (
    <>
      <Layout>
        <Routes>
        <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup />
            }
          />
          <Route
            path="/welcome"
            element={
              <Welcome />
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
