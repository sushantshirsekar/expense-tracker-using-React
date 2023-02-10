import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
    name: 'premium', 
    initialState: {isPremium: false}, 
    reducers: {
        activePremium(state){
            state.isPremium = true; 
        }
    }
})

export const premiumActions = premiumSlice.actions; 
export default premiumSlice.reducer; 