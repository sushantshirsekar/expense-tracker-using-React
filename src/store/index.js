import { configureStore } from "@reduxjs/toolkit";
import addExpenseReducer from "./addExpense-reducer";
import authReducer from "./auth-reducer";
import premiumReducer from "./expense-reducer"; 

const store = configureStore({
    reducer: {
        auth: authReducer, 
        premium: premiumReducer, 
        addExpense: addExpenseReducer, 
    }
})

export default store; 