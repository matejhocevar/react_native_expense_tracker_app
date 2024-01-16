import {createContext, useReducer} from "react";
import DUMMY_EXPENSES from "../data/dummy_expenses";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {
  },
  updateExpense: (id, {description, amount, date}) => {
  },
  deleteExpense: (id) => {
  },
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload.data, id}, ...state];
    case "UPDATE":
      const expenseIndex = state.findIndex((e) => e.id === action.payload.id);
      const expense = state[expenseIndex];
      const updateItem = {...expense, ...action.payload.data};
      const expenses = [...state];
      expenses[expenseIndex] = updateItem;
      return expenses;
    case "DELETE":
      return state.filter((e) => e.id !== action.payload.id);
    default:
      return state;
  }
}

const ExpensesContextProvider = ({children}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({type: "ADD", payload: {data: expenseData}});
  }

  function updateExpense(id, {expenseData}) {
    dispatch({type: "UPDATE", payload: {id, data: expenseData}})
  }

  function deleteExpense(id) {
    dispatch({type: "DELETE", payload: {id}})
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;