import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import DUMMY_EXPENSES from "../data/dummy_expenses";

const AllExpensesScreen = () => {
  return (
    <ExpensesOutput expensesPeriod="Total" expenses={DUMMY_EXPENSES}/>
  );
}

const styles = StyleSheet.create({});

export default AllExpensesScreen;