import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseProvider = (props) => {
  const [expenses, updateExpenses] = useState([]);
useEffect(()=>{
    fetch('https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense.json').then((res)=> {
        if(res.ok){
            return res.json(); 
        }
    }).then((data)=> {
        let newExpense = []; 
        for(const key in data) {
            newExpense.push({
                id: key, 
                description: data[key].description, 
                category: data[key].category, 
                amount: data[key].amount, 
            })
        }
        updateExpenses(newExpense);
        console.log(newExpense);
    })
}, [])


  const addExpenseHandler = (expense) => {
    let newExpense = [...expenses];    
    fetch(
      "https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(expense),
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

  const expenseContext = {
    expenses: expenses,
    totalAmount: 0,
    addExpense: addExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseProvider;
