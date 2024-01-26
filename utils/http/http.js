import axios from "axios";
import {AppConfig} from "../../constants/config";

export const storeExpense = async (expenseData) => {
  const {data} = await axios.post(
    `${AppConfig.BACKEND_URL}/${AppConfig.EXPENSES_COLLECTION}`,
    expenseData,
  );
  return data.name;
}

export const fetchExpenses = async () => {
  const response = await axios.get(`${AppConfig.BACKEND_URL}/${AppConfig.EXPENSES_COLLECTION}`);

  const expenses = [];
  for (const key in response.data) {
    const data = response.data[key];
    const expense = {
      id: key,
      amount: data.amount,
      date: new Date(data.date),
      description: data.description,
    }
    expenses.push(expense);
  }

  return expenses;
}

export const updateExpense = (id, data) => {
  return axios.put(`${AppConfig.BACKEND_URL}/expenses/${id}.json`, data);
};

export const deleteExpense = (id) => {
  return axios.delete(`${AppConfig.BACKEND_URL}/expenses/${id}.json`);
};