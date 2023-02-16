import { createSlice } from "@reduxjs/toolkit";

const AddExpense = createSlice({
  name: "Add Expense",
  initialState: { expenses: [], totalAmount: 0 , premium: false, changed: false},
  reducers: {
    resetExpenses(state){
      state.expenses = [];
      state.totalAmount = 0; 
      state.premium = false; 
      state.changed = false; 
    }, 
    replaceExpenses(state, action){
      state.expenses = action.payload.expenses; 
      state.totalAmount = action.payload.total; 
      state.premium = action.payload.premium;
    },
    addExpense(state, action) {
      state.changed = true; 
      console.log(action.payload.amount);
      let data = action.payload; 
      state.expenses.push({
        id: data.id, 
        amount: data.amount, 
        description: data.description, 
        category: data.category, 
      })
        state.totalAmount = Number(state.totalAmount) + Number(data.amount);
      console.log(state.totalAmount);
       
    },
    edit(state, action) {
      state.changed = true; 
      let data = action.payload; 
      state.expenses = state.expenses.filter((expense)=> expense.id !== data.id); 
      state.totalAmount = Number(state.totalAmount) - Number(data.amount); 

    },
    delete(state, action) {
      state.changed = true; 
      let data = action.payload; 
      state.expenses = state.expenses.filter((item)=> item.id !== data.id);
      state.totalAmount = Number(state.totalAmount) - Number(data.amount); 
      if(state.totalAmount < 10000){
        state.premium = false;
      }
    },
    setPremium(state){
      state.premium = true; 
      state.changed = true; 
    }, 
    desetPremium(state){
      state.premium = false;
      state.changed = true; 
    }

  }
});

export const AddExpenseActions = AddExpense.actions;

export default AddExpense;
