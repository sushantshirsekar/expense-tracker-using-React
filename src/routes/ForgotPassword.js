import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef("");
  const nav = useNavigate();

  const submitForgotPassword = (event) => {
    event.preventDefault();
    const enteredMailPass = emailRef.current.value;
    console.log(enteredMailPass);
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBWGYRRzV87ZdrnvV_7QsU_lrt4uA9A2b4", {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enteredMailPass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
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
        console.log(data);
        alert("Link to reset password is sent to " + data.email); 
        nav("/"); 
      }).catch((err)=> alert(err.message));
  };
  return (
    <Form
      className="text-center d-flex justify-content-center "
      onSubmit={submitForgotPassword}
    >
      <Form.Group
        className="mb-3 justify-content-center mt-5 px-5 py-3"
        controlId="formBasicEmail"
        style={{ width: "400px", border: "1px solid black" }}
      >
        <h1 className="mt-2">Forgot Password</h1> <br />
        <Form.Label className="text-lg-center">
          Enter Email
        </Form.Label>
        <Form.Control
          ref={emailRef}
          type="email"
          placeholder="Enter email"
          className="text-center"
        />
        <Button variant="secondary" className="mt-3 mb-3" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ForgotPassword;
