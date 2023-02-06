import { useContext, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import ExpenseContext from "../expense-context";

const AddExpense = () => {
  const descRef = useRef("");
  const catRef = useRef("");
  const amountRef = useRef("");
  const expenseCtx = useContext(ExpenseContext);
  const [edit, setEdit] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredDesc = descRef.current.value;
    const enteredCat = catRef.current.value;
    const enteredAmnt = amountRef.current.value;

    if (!enteredDesc || !enteredCat || !enteredAmnt) {
      return alert("Please enter all input fields");
    }
    let data = {
      description: enteredDesc,
      category: enteredCat,
      amount: enteredAmnt,
    };
    console.log(JSON.stringify(data));
    expenseCtx.addExpense(data);
    descRef.current.value = "";
    amountRef.current.value = "";
    catRef.current.value = "";
  };

  const secondEditHandler = (event) => {
    event.preventDefault();
    const enteredDesc = descRef.current.value;
    const enteredCat = catRef.current.value;
    const enteredAmnt = amountRef.current.value;
    let editId = localStorage.getItem("editId");
    if (!enteredDesc || !enteredCat || !enteredAmnt) {
      return alert("Please enter all input fields");
    }
    let data = {
      id: editId,
      description: enteredDesc,
      category: enteredCat,
      amount: enteredAmnt,
    };
    descRef.current.value = "";
    amountRef.current.value = "";
    catRef.current.value = "";
    expenseCtx.secondEdit(editId, data);
    localStorage.removeItem("editId");
  };
  return (
    <>
      <div
        className="d-flex justify-content-center mt-5"
        style={{ width: "400px", border: "1px solid black", margin: "auto" }}
      >
        <Form className="mt-2 text-center" style={{ width: "300px" }}>
          <h1 className="mt-1">Add Expense</h1>
          <Form.Group
            className="mt-3 justify-content-center "
            controlId="formBasicDescription"
          >
            <Form.Control
              ref={descRef}
              type="text"
              placeholder="Description"
              className="text-center"
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            className="mt-2 text-center"
            ref={catRef}
          >
            <option>Select Category of expense</option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="monthly-expense">Monthly-Expense</option>
          </Form.Select>
          <Form.Group className="mt-2">
            <Form.Control
              ref={amountRef}
              type="number"
              className="text-center"
              placeholder="Enter Amount"
              id="amount"
            />
          </Form.Group>

          {!edit && (
            <Button
              variant="secondary"
              className="mt-3 mb-3"
              onClick={submitHandler}
            >
              Add
            </Button>
          )}
          {edit && (
            <Button className="mt-3 mb-3" onClick={secondEditHandler}>
              Edit
            </Button>
          )}
        </Form>
      </div>
      <div className="d-flex justify-content-center">
        <div
          style={{ width: "700px", border: "1px solid black" }}
          className="mt-5 text-center "
        >
          <h1 className="mt-3 mb-3">Expenses</h1>
          <ListGroup>
            {console.log(expenseCtx.expenses)}
            {expenseCtx.expenses.map((expense) => {
              const deleteHandler = () => expenseCtx.removeExpense(expense.id);
              const editHandler = () => {
                descRef.current.value = expense.description;
                amountRef.current.value = expense.amount;
                catRef.current.value = expense.category;
                localStorage.setItem("editId", expense.id);
                setEdit(true);
                expenseCtx.firstEdit(expense.id);
              };
              return (
                <ListGroup.Item id={expense.id}>
                  <span className="mx-5 text-lg fw-bold">
                    {expense.description +
                      " " +
                      expense.category +
                      " " +
                      expense.amount}
                  </span>
                  <div>
                    <Button
                      className="mx-2"
                      variant="danger"
                      onClick={deleteHandler}
                    >
                      Delete
                    </Button>
                    <Button onClick={editHandler}>Edit</Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
