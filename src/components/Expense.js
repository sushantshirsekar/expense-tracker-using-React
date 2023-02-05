import { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ExpenseContext from "../expense-context";

const Expense = () => {
    const expenseCtx = useContext(ExpenseContext); 
  return (
    <div className="d-flex justify-content-center">
    <div style={{width:'700px', border:'1px solid black'}} className="mt-5 text-center ">
        <h1 className="mt-3 mb-3">Expenses</h1>
        <ListGroup>
    {expenseCtx.expenses.map((expense)=> {
        return <ListGroup.Item className="text-start">
            <span>{expense.category + " "}</span>
            <span>{expense.amount + " "}</span>
            <span>{expense.description }</span>
        </ListGroup.Item>
    })}
      </ListGroup>
    </div>
    </div>
  );
};
export default Expense;
