import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {sortDatesDesc} from "../utils/formatters/date";

const AllExpensesScreen = () => {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expenses.sort(sortDatesDesc);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="No expenses found."
    />
  );
}

const styles = StyleSheet.create({});

export default AllExpensesScreen;