import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {useContext} from "react";
import {getDateMinusDays, sortDatesDesc} from "../utils/formatters/date";

const RecentExpensesScreen = () => {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expenses.filter((e) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return e.date > date7DaysAgo;
  }).sort(sortDatesDesc);

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={expenses}
      fallbackText="No expenses found in the last 7 days."
    />
  );
}

const styles = StyleSheet.create({});

export default RecentExpensesScreen;