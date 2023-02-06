import { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ExpenseContext from "../expense-context";

const Expense = () => {
  const expenseCtx = useContext(ExpenseContext);

  return (
    <div className="d-flex justify-content-center">
      <div
        style={{ width: "700px", border: "1px solid black" }}
        className="mt-5 text-center "
      >
        <h1 className="mt-3 mb-3">Expenses</h1>
        <ListGroup>
          {console.log(expenseCtx.expenses)}
          {expenseCtx.expenses.map((expense) => {
            return (
              <ListGroup.Item id={expense.id}>
                {expense.description +
                  " " +
                  expense.category +
                  " " +
                  expense.amount}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
};
export default Expense;
