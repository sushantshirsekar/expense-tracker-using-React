import { createSlice } from "@reduxjs/toolkit";

// let initStatus = localStorage.getItem('premiumAvailability'); 
const premiumSlice = createSlice({
    name: 'premium', 
    initialState: {isPremium: false, theme: 'bg-light', premiumStatus: 'Activate'}, 
    reducers: {
        replacetheme(state){
            state.isPremium = true; 
            state.theme = 'bg-dark';
            state.premiumStatus = 'Deactivate';  
        },
        activePremium(state){
            state.isPremium = true; 
        }, 
        deactivePremium(state){
            state.isPremium = false;
        },
        activatePremium(state){
            if(state.isPremium === true){
                if(state.theme === 'bg-light'){
                    state.premiumStatus= 'Deactivate'; 
                    state.theme = 'bg-dark'; 
                }
            }
        }, 
        deactivatePremium(state){
            if (state.theme === 'bg-dark'){
                state.premiumStatus= 'Activate'; 
                state.theme = 'bg-light';
            }
        }
    }
})

export const premiumActions = premiumSlice.actions; 
export default premiumSlice.reducer; 