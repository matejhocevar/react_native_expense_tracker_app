import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

const AllExpensesScreen = () => {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesContext.expenses}
      fallbackText="No expenses found."
    />
  );
}

const styles = StyleSheet.create({});

export default AllExpensesScreen;