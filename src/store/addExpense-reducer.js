import { createSlice } from "@reduxjs/toolkit";

const AddExpense = createSlice({
  name: "Add Expense",
  initialState: { expenses: [], totalAmount: 0 },
  reducers: {
    addExpense(state, action) {
      console.log(action.payload.id);
      let index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index === -1) {
        state.expenses.push(action.payload);
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
      }
    },
    total(state, action) {
      state.totalAmount = Number(state.totalAmount) + Number(action.payload);
      localStorage.setItem("total", state.totalAmount);
      
    },
    edit(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      
    },
    delete(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
      fetch(
        `https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/expense/${action.payload}.json`,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => console.log(data));
    },
  },
});

export const AddExpenseActions = AddExpense.actions;

export default AddExpense.reducer;
