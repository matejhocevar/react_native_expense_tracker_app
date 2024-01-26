import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {getDateMinusDays, sortDatesDesc} from "../utils/formatters/date";
import {fetchExpenses} from "../utils/http/http";
import {ExpensesContext} from "../store/expenses-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpensesScreen = () => {
  const expensesContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        expensesContext.setExpenses(await fetchExpenses())
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);


  const expenses = expensesContext.expenses.filter((e) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return e.date > date7DaysAgo;
  }).sort(sortDatesDesc);

  function errorHandler() {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay onConfirm={errorHandler}>{error}</ErrorOverlay>
  }

  if (isLoading) {
    return <LoadingOverlay/>;
  }

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