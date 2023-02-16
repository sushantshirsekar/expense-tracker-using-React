import { AddExpenseActions } from "./addExpense-reducer";
import { premiumActions } from "./expense-reducer";

export const fetchData = () => {
  let email = localStorage.getItem("email");
  let validEmail = "";
  if(email){
    for (let i = 0; i < email.length; i++) {
        if (email[i] !== "." && email[i] !== "@") {
          validEmail = validEmail + email[i];
        }
      }
  }
  
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        `https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/${validEmail}.json`
      );
      if (!res.ok) {
        throw new Error("Fetching failed");
      }

      const data = await res.json();
      return data;
    };
    try {
      const expenseitems = await fetchData();
      if(expenseitems.premium === true){
        dispatch(premiumActions.replacetheme());
      }else{
        dispatch(premiumActions.deactivatePremium());
      }
      dispatch(
        AddExpenseActions.replaceExpenses({
          expenses: expenseitems.expenses || [],
          total: expenseitems.totalAmount || 0,
          premium: expenseitems.premium,
        })
      );
    } catch {}
  };
};

export const expenseData = (expense) => {
  return async () => {
    const sendRequest = async () => {
      let email = localStorage.getItem("email");
      let validEmail = "";
      for (let i = 0; i < email.length; i++) {
        if (email[i] !== "@" && email[i] !== ".") {
          validEmail = validEmail + email[i];
        }
      }
      const res = await fetch(
        `https://expense-tracker-db-a1884-default-rtdb.firebaseio.com/${validEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            expenses: expense.expenses, 
            totalAmount: expense.totalAmount || 0, 
            premium: expense.premium
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Loading of expense failed");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
