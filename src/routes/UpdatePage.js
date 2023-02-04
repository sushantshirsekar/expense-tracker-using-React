import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

const UpdatePage = () => {
  const nameref = useRef("");
  const picref = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameref.current.valueOf;
    const enteredPic = picref.current.valueOf;
    const storageId = localStorage.getItem("idToken");
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
    ).then((res) => {
      console.log(res.json());
    });
  };
  return (
    <Container>
      <h1>Update Details</h1> <br />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Update Name" ref={nameref} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhotoUrl">
          <Form.Label>Photo Url: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Update Photo Url"
            ref={picref}
          />
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
  );
};
export default UpdatePage;
