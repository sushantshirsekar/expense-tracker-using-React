import { useState } from "react"
import ExpenseContext from "./expense-context"




const ExpenseProvider = (props) => {

    const [expenses, updateExpenses] = useState([]); 


    const addExpenseHandler =(expense) => {
        let newExpense = [...expenses]; 
        newExpense.push({...expense}); 
        updateExpenses(newExpense)
    }

    const expenseContext = {
        expenses : expenses, 
        totalAmount: 0,
        addExpense: addExpenseHandler, 
    }
    return <ExpenseContext.Provider value={expenseContext}>
        {props.children}
    </ExpenseContext.Provider>
}
export default ExpenseProvider; 
