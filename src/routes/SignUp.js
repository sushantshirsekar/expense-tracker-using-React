import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-reducer";
import { AddExpenseActions } from "../store/addExpense-reducer";

const SignUp = () => {
  const expenses = useSelector(state => state.expenses); 
  let confirmPasswordRef = useRef("");
  let emailRef = useRef("");
  let passwordRef = useRef("");
  const [logInStatus, setLogInStatus] = useState(true);
  const nav = useNavigate();
  const auth = useSelector(state=> state.auth.token); 
  const dispatch = useDispatch(); 

  const logInHandler = (token) => {
    nav("/welcome");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBWGYRRzV87ZdrnvV_7QsU_lrt4uA9A2b4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Registeration Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if(data.users[0].emailVerified){
        localStorage.setItem("emailVerified", data.users[0].emailVerified);
            console.log('Email is Verified');
        }
        else{
            console.log("Email is not verified");
        }


        console.log(data.users[0]);
        console.log(data);

        fetch('https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense.json')
        .then((res)=>{
          if(res.ok){
            return res.json(); 
          }
        }).then((data)=> {
          console.log(data);
          let arr = []; 
          for(const key in data){
            dispatch(AddExpenseActions.addExpense({
              id: key, 
              description: data[key].description, 
              category: data[key].category,
              amount: data[key].amount, 
            }))
          }
          for(const key in data){
            arr.push({
              id: key, 
              description: data[key].description, 
              category: data[key].category,
              amount: data[key].amount, 
            })
          }
          console.log(arr);
        })
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let enteredMail = emailRef.current.value;

    let enteredConfirmPassword = confirmPasswordRef.current.value;
    if (!logInStatus) {
      let enteredPassword = passwordRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        return alert("Password and confirm password doesn't match");
      }
    }
    let url;
    if (logInStatus) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWGYRRzV87ZdrnvV_7QsU_lrt4uA9A2b4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWGYRRzV87ZdrnvV_7QsU_lrt4uA9A2b4";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredMail,
        password: enteredConfirmPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Registeration Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        logInHandler(data.idToken);
        dispatch(authActions.login(data.idToken));
        console.log(auth); 
        console.log(data);
        console.log(data.displayName);
        if (data.displayName) {
          localStorage.setItem("displayName", data.displayName);
        }
        if (data.profilePicture) {
          localStorage.setItem("photoUrl", data.profilePicture);
        }
      })
      .catch((err) => alert(err.message));
  };
  const switchStatus = () => {
    setLogInStatus((prev) => !prev);
  };
  return (
    <div className="" style={{ height: "600px" }}>
      <div className="mt-5 ">
        <div
          className="bg-light px-5 py-2 border border-dark"
          style={{
            color: "black",
            width: "500px",
            justifyContent: "center",
            margin: "auto",
            borderRadius: "10px",
            background: "",
          }}
        >
          <h1
            className="text-center fw-bold mb-5 py-2"
            style={{
              color: "black",
              fontFamily: "sans-serif",
              borderBottom: "1px solid grey",
            }}
          >
            {logInStatus ? "Login" : "SignUp"}
          </h1>
          <Form
            className="mt-3 mb-5 d-block text-center justify-content-center "
            onSubmit={submitHandler}
          >
            <Form.Group
              className="mb-3 justify-content-center"
              controlId="formBasicEmail"
            >
              <Form.Label className="text-lg-center">Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            {!logInStatus && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={passwordRef}
                  type="text"
                  placeholder="Password"
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="formBasicConfirmPassword">
                {logInStatus ? "Password" : "Confirm Password"}
              </Form.Label>
              <Form.Control
                ref={confirmPasswordRef}
                type="password"
                placeholder={logInStatus ? "Password" : "Confirm Password"}
                id="formBasicConfirmPassword"
              />
            </Form.Group>
            {logInStatus && <Link className="py-5" to="/forgotpassword">forgot password?</Link>} <br />
            {logInStatus && (
              <Button variant="secondary" className="mb-2" type="submit">
                Log in
              </Button>
            )}
            {!logInStatus && (
              <Button variant="secondary" className="mb-2" type="submit">
                Register
              </Button>
            )}
            <br />
            <Button
              onClick={switchStatus}
              className="bg-transparent border-none"
              style={{ color: "blue", border: "none" }}
            >
              {logInStatus ? "Create Account" : "Log into existing Account"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
