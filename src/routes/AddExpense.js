import { Form, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { AddExpenseActions } from "../store/addExpense-reducer";
import { premiumActions } from "../store/expense-reducer";
import { useRef, useState } from "react";
import "./AddExpense.css";
import { CSVLink } from "react-csv";

const AddExpense = () => {
  const expenses = useSelector((state) => state.addExpense);
  const totalAmount = useSelector((state) => state.addExpense.totalAmount);
  const descRef = useRef("");
  const catRef = useRef("");
  const amountRef = useRef("");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const premium = useSelector((state) => state.premium.isPremium);
  const theme = useSelector((state) => state.premium.theme);
  const isPremiumActivated = useSelector((state) => state.addExpense.premium);
  const classes = "mt-2 text-center" + theme;
  const premiumStatus = useSelector((state) => state.premium.premiumStatus);

  const headers = [
    { label: "amount", key: "amount" },
    { label: "category", key: "category" },
    { label: "description", key: "description" },
  ];

  const csvLink = {
    filename: "expense.csv",
    headers: headers,
    data: expenses.expenses,
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // if (enteredDesc ==='' || enteredCat==='' || enteredAmnt==='') {
    //   return alert("Please enter all expense details");
    // }

    dispatch(
      AddExpenseActions.addExpense({
        id: Date.now(),
        amount: amountRef.current.value,
        description: descRef.current.value,
        category: catRef.current.value,
      })
    );
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
      return alert("Please enter all expense details");
    }

    dispatch(
      AddExpenseActions.addExpense({
        id: editId,
        amount: enteredAmnt,
        description: enteredDesc,
        category: enteredCat,
      })
    );

    descRef.current.value = "";
    amountRef.current.value = "";
    catRef.current.value = "";
    setEdit(false);
    localStorage.removeItem("editId");
    localStorage.removeItem("amount");
    localStorage.removeItem("description");
    localStorage.removeItem("category");
  };

  const premiumToggle = () => {
    if (premiumStatus === "Activate") {
      dispatch(premiumActions.activatePremium());
      dispatch(AddExpenseActions.setPremium());
    } else if (premiumStatus === "Deactivate") {
      dispatch(premiumActions.deactivatePremium());
      dispatch(AddExpenseActions.desetPremium());
    }
  };
  return (
    <>
      <div
        className=" text-center mt-5"
        style={{ width: "400px", border: "1px solid black", margin: "auto" }}
      >
        <div className="d-flex justify-content-center">
          <Form className={classes} style={{ width: "300px" }}>
            <h1 className="mt-1">Add Expense</h1>
            <Form.Group
              className={"mt-3 justify-content-center " + theme}
              controlId="formBasicDescription"
            >
              <Form.Control
                ref={descRef}
                type="text"
                placeholder="Description"
                className={
                  theme === "bg-dark"
                    ? "text-center text-light bg-dark"
                    : "text-center"
                }
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              className={"mt-2 text-center " + theme}
              ref={catRef}
            >
              <option
                className={
                  theme === "bg-dark"
                    ? "text-center text-light bg-dark"
                    : "text-center"
                }
              >
                Select Category of expense
              </option>
              <option value="food" className={theme}>
                Food
              </option>
              <option value="petrol" className={theme}>
                Petrol
              </option>
              <option value="monthly-expense" className={theme}>
                Monthly-Expense
              </option>
            </Form.Select>
            <Form.Group className="mt-2">
              <Form.Control
                ref={amountRef}
                type="number"
                className={
                  theme === "bg-dark"
                    ? "text-center text-light bg-dark"
                    : "text-center"
                }
                placeholder="Enter Amount"
                id="amount"
              />
            </Form.Group>
          </Form>
        </div>
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
      </div>
      <div className="d-flex justify-content-center">
        <div
          style={{ width: "700px", border: "1px solid black" }}
          className="mt-5 text-center "
        >
          <h1 className="mt-3 mb-3">Expenses</h1>
          {premium && (
            <div className="mt-2 mb-2" id="expense.id">
              <Button
                onClick={premiumToggle}
                variant="warning"
                className="toggle"
              >
                {premiumStatus}
              </Button>
            </div>
          )}
          {isPremiumActivated && (
            <div className="mt-2 mb-2">
              <CSVLink
                style={{ textDecoration: "none", color: "white" }}
                {...csvLink}
              >
                <Button>Download Expenses</Button>
              </CSVLink>
            </div>
          )}
          <ListGroup className="text-center">
            {expenses.expenses.map((expense) => {
              const deleteHandler = () => {
                dispatch(AddExpenseActions.delete(expense));
              };
              const editHandler = () => {
                descRef.current.value = expense.description;
                amountRef.current.value = expense.amount;
                catRef.current.value = expense.category;
                localStorage.setItem("editId", expense.id);
                setEdit(true);
                dispatch(AddExpenseActions.edit(expense));
                if (totalAmount >= 10000) {
                  dispatch(premiumActions.activatePremium());
                } else {
                  dispatch(premiumActions.deactivePremium());
                }
              };
              return (
                <ListGroup.Item id={expense.id} className={theme}>
                  <span className="mx-5 text-lg fw-bold" id={expense.id}>
                    {expense.description +
                      " " +
                      expense.category +
                      " " +
                      expense.amount}
                  </span>
                  <div id="allButtons">
                    <Button
                      id={expense.id}
                      className="mx-2"
                      variant="danger"
                      onClick={deleteHandler}
                    >
                      Delete
                    </Button>
                    <Button id={expense.id} onClick={editHandler}>
                      Edit
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <ListGroup>
            <ListGroup.Item className={theme}>
              <h4>Total Amount</h4>
              <span>{totalAmount}</span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
