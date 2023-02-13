import { Form, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { AddExpenseActions } from "../store/addExpense-reducer";
import { premiumActions } from "../store/expense-reducer";
import { useRef, useState } from "react";
import { useEffect } from "react";
import "./AddExpense.css";
import { CSVLink } from "react-csv";

const AddExpense = () => {
  const expenses = useSelector((state) => state.addExpense.expenses);
  const totalAmount = useSelector((state) => state.addExpense.totalAmount);
  const descRef = useRef("");
  const catRef = useRef("");
  const amountRef = useRef("");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.premium.isPremium);
  const theme = useSelector((state) => state.premium.theme);
  const isPremiumActivated = useSelector(
    (state) => state.premium.premiumActivated
  );
  const classes = "mt-2 text-center" + theme;
  const premiumStatus = useSelector((state) => state.premium.premiumStatus);

  const enteredDesc = descRef.current.value;
  const enteredCat = catRef.current.value;
  const enteredAmnt = amountRef.current.value;

  const headers = [
    { label: "amount", key: "amount" },
    { label: "category", key: "category" },
    { label: "description", key: "description" },
  ];
  
  const csvLink = {
    filename: "expense.csv",
    headers: headers,
    data: expenses,
  };

  useEffect(() => {
    fetch(
      "https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense.json",
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        for (const key in data) {
          let index = expenses.findIndex((id) => id !== key);
          if (index === -1) {
            let arr = { ...data[key], id: key };
            dispatch(AddExpenseActions.addExpense(arr));
            dispatch(AddExpenseActions.total(data[key].amount));
          }
        }
      });
  }, [expenses]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredDesc || !enteredCat || !enteredAmnt) {
      return alert("Please enter all expense details");
    }
    let expensedata = {
      amount: enteredAmnt,
      category: enteredCat,
      description: enteredDesc,
    };
    let arr;
    fetch(
      "https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(expensedata),
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
            let errorMessage = "Addition of Expense Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.name);
        arr = { ...expensedata, id: data.name };
        dispatch(AddExpenseActions.addExpense(arr));
        console.log(arr);
      });
    dispatch(AddExpenseActions.total(enteredAmnt));
    console.log(totalAmount);
    let storagetotal = localStorage.getItem("total");
    console.log(storagetotal);
    if (storagetotal >= 10000) {
      dispatch(premiumActions.activePremium());
      console.log(isPremium);
    } else {
      dispatch(premiumActions.deactivePremium());
    }

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
    let data = {
      id: editId,
      description: enteredDesc,
      category: enteredCat,
      amount: enteredAmnt,
    };
    fetch(
      `https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense/${editId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Edit of Expense Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.amount);
        dispatch(AddExpenseActions.addExpense(data));
        dispatch(AddExpenseActions.total(data.amount));
        let storageTotal = localStorage.getItem("total");
        if (storageTotal >= 10000) {
          dispatch(premiumActions.activatePremium());
        } else {
          dispatch(premiumActions.deactivePremium());
        }
      })
      .catch((err) => alert(err.message));
    descRef.current.value = "";
    amountRef.current.value = "";
    catRef.current.value = "";
    setEdit(false);
    localStorage.removeItem("editId");
  };

  const premiumToggle = () => {
    dispatch(premiumActions.activatePremium());
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
                className={"text-center " + theme}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              className={"mt-2 text-center " + theme}
              ref={catRef}
            >
              <option className={theme}>Select Category of expense</option>
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
                className={"text-center " + theme}
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
          {console.log(expenses)}
          {isPremium && (
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
                 {...csvLink} >
                <Button>Download Expenses</Button>
              </CSVLink>
            </div>
          )}
          <ListGroup className="text-center">
            {expenses.map((expense) => {
              const deleteHandler = () => {
                dispatch(AddExpenseActions.delete(expense.id));
                dispatch(AddExpenseActions.total(Number(-expense.amount)));
                console.log(totalAmount);
                let storagetotal = localStorage.getItem("total");
                if (storagetotal >= 10000) {
                  dispatch(premiumActions.activePremium());
                } else {
                  dispatch(premiumActions.deactivePremium());
                }
              };
              const editHandler = () => {
                console.log(expense);
                descRef.current.value = expense.description;
                amountRef.current.value = expense.amount;
                catRef.current.value = expense.category;
                localStorage.setItem("editId", expense.id);
                setEdit(true);
                dispatch(AddExpenseActions.total(Number(-expense.amount)));
                dispatch(AddExpenseActions.edit(expense.id));
                let storageTotal = localStorage.getItem("total");
                if (storageTotal >= 10000) {
                  dispatch(premiumActions.activePremium());
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
