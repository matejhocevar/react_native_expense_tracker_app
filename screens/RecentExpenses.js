import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import DUMMY_EXPENSES from "../data/dummy_expenses";

const RecentExpensesScreen = () => {
  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" expenses={DUMMY_EXPENSES}/>
  );
}

const styles = StyleSheet.create({});

export default RecentExpensesScreen;