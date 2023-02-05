import { useContext, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import ExpenseContext from "../expense-context";

const AddExpense = () => {
  const descRef = useRef("");
  const catRef = useRef("");
  const amountRef = useRef("");
  const expenseCtx = useContext(ExpenseContext);
  const submitHandler = (event) => {
    event.preventDefault();
    let data = {
      id: Date.now(),
      description: descRef.current.value,
      category: catRef.current.value,
      amount: amountRef.current.value,
    };
    expenseCtx.addExpense(data);
    console.log(expenseCtx.expenses); 
    descRef.current.value = ''; 
    amountRef.current.value = ''; 
    catRef.current.value = '';
  };
  return (
    <div
      className="d-flex justify-content-center mt-5"
      style={{ width: "400px", border: "1px solid black", margin: "auto" }}
    >
      <Form
        className="mt-2 text-center"
        style={{ width: "300px" }}
        onSubmit={submitHandler}
      >
        <h1 className="mt-1">Add Expense</h1>
        <Form.Group
          className="mb-3 justify-content-center "
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
          required
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

        <Button variant="secondary" className="mt-3 mb-3" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddExpense;
