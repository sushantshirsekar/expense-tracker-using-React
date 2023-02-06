import React from "react";

const ExpenseContext = React.createContext({
    expenses:[],
    totalAmount:0, 
    addExpense: (expense)=>{},
    removeExpense: (id)=>{},
    firstEdit: (id)=>{},
    secondEdit: (id)=>{},   
    isLoggedIn: false, 
    login: (token) => {},
    logout: ()=>{},
})

export default ExpenseContext;