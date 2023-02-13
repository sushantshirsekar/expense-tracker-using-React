import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authentication', 
    initialState: {isAuthenticated: false, token: null}, 
    reducers: {
        login(state,action){
            state.isAuthenticated=true;
            state.token = action.payload;  
            localStorage.setItem('token', action.payload);
        }, 
        logout(state){
            state.isAuthenticated=false; 
            state.token = null; 
            localStorage.removeItem('token'); 
        }
    }
})

export const authActions = authSlice.actions; 

export default authSlice.reducer; 