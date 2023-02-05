import {  useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logout from "../components/LogOut";

const UpdatePage = () => {
  const nav = useNavigate();

  const nameref = useRef("");
  const picref = useRef("");
  const verifyHandler = () => {
    let storageId = localStorage.getItem("idToken");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBWGYRRzV87ZdrnvV_7QsU_lrt4uA9A2b4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: storageId,
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
            let errorMessage = "Verification Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("Please Check  " + data.email + "and login again");
        nav("/");
      })
      .catch((err) => alert(err.message));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameref.current.value;
    const enteredPic = picref.current.value;
    const storageId = localStorage.getItem("idToken");
    console.log(enteredName, enteredPic);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBWGYRRzV87ZdrnvV_7QsU_lrt4uA9A2b4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: storageId,
          displayName: enteredName,
          photoUrl: enteredPic,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        // console.log(res);
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Update Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {

      })
      .catch((err) => alert(err.message));
  };


  return (
    <>
      <Container>
        <div className="d-flex justify-content-center">
          <div className="mx-5 px-5">
            <h1>Update Details</h1>
          </div>
          <div className="align-text-end  mx-5 px-5 ">
            <Logout />
          </div>
        </div>
        <br />
        <Form onSubmit={submitHandler}  style={{marginLeft:'280px'}}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Name"
              ref={nameref}
              defaultValue={localStorage.getItem('displayName')}
              style={{width:'400px'}}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhotoUrl">
            <Form.Label>Photo Url: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Photo Url"
              ref={picref}
              defaultValue={localStorage.getItem('photoUrl')}
              style={{width:'400px'}}
            />
          </Form.Group>
          <Button type="submit" variant="secondary">
            Update
          </Button>
        </Form>
        
           <div className="mb-5 mt-5" style={{marginLeft:'280px'}} >
            <h1> {localStorage.getItem('emailVerified') ? "Your Email is Verified": "Verify your email"}</h1>
            {!localStorage.getItem('emailVerified') && <Button variant="secondary" className="mt-2" onClick={verifyHandler}>
              Verify
            </Button>}
          </div>
        
      </Container>
    </>
  );
};
export default UpdatePage;
