import { createSlice } from "@reduxjs/toolkit";

// let initStatus = localStorage.getItem('premiumAvailability'); 
const premiumSlice = createSlice({
    name: 'premium', 
    initialState: {isPremium: false, theme: 'bg-light' , premiumActivated: 'false', premiumStatus: 'Deactivated'}, 
    reducers: {
        activePremium(state){
            state.isPremium = true; 
        }, 
        deactivePremium(state){
            state.isPremium = false;
        },
        activatePremium(state){
            if(state.isPremium === true){
                if(state.theme === 'bg-light'){
                    state.premiumActivated = true; 
                    state.premiumStatus= 'Activated'; 
                    state.theme = 'bg-dark'; 
                    localStorage.setItem('theme', 'bg-dark');
                }else if (state.theme === 'bg-dark'){
                    state.premiumStatus= 'Deactivated'; 
                    state.premiumActivated = false; 
                    state.theme = 'bg-light';
                    localStorage.setItem('theme', 'bg-light');
                }
            }
        }
    }
})

export const premiumActions = premiumSlice.actions; 
export default premiumSlice.reducer; 