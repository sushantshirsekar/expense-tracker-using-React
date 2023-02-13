import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseProvider = (props) => {
  const [expenses, updateExpenses] = useState([]);


  const addExpenseHandler = (expense) => {
    let newExpense = [...expenses];    
    fetch(
      "https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(expense),
        
      }
    )
      .then((res) => {
        console.log(res);
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
        for (const key in data) {
            newExpense.push({ ...expense , id: data[key]});
        }
        updateExpenses(newExpense);
      })
      .catch((err) => alert(err.message));
  };

  const removeExpenseHandler = (id) => {
    let newExpense = [...expenses]; 
    let exdata = newExpense.filter((e) => e.id !== id); 
    updateExpenses(exdata);
    fetch(`https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense/${id}.json`, {
        method:"DELETE", 
    }).then((res)=> console.log(res))
  }

  const firstEditHandler = (id) =>{
    let newExpenses = [...expenses];
    let editExpenses = newExpenses.filter((e) => e.id !== id); 
    updateExpenses(editExpenses);
  }

  const secondEditHandler = (id, expense) => {
    let newExpense = [...expenses]; 
    
  }

  const expenseContext = {
    expenses: expenses,
    totalAmount: 0,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler, 
    firstEdit: firstEditHandler, 
    secondEdit: secondEditHandler, 
  };
  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseProvider;
