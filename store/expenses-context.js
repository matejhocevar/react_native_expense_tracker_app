import {createContext, useReducer} from "react";
import {sortDatesDesc} from "../utils/formatters/date";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {
  },
  setExpenses: (expenses) => {
  },
  updateExpense: (id, {description, amount, date}) => {
  },
  deleteExpense: (id) => {
  },
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [{...action.payload.data}, ...state];
    case "SET":
      return action.payload.sort(sortDatesDesc);
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({type: "ADD", payload: {data: expenseData}});
  }

  function setExpenses(expenses) {
    dispatch({type: "SET", payload: expenses})
  }

  function updateExpense(id, expenseData) {
    dispatch({type: "UPDATE", payload: {id, data: expenseData}})
  }

  function deleteExpense(id) {
    dispatch({type: "DELETE", payload: {id}})
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses: setExpenses,
    updateExpense,
    deleteExpense,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;