import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import premiumReducer from "./expense-reducer"; 

const store = configureStore({
    reducer: {
        auth: authReducer, 
        premium: premiumReducer, 
    }
})

export default store; 