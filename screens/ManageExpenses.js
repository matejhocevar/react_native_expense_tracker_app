import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../utils/http/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpensesScreen = ({route, navigation}) => {
  const expensesContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const expenseId = route.params?.expenseId;
  const expense = expensesContext.expenses.find((e) => e.id === expenseId);
  const isEdit = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  async function deleteExpenseHandler() {
    setIsLoading(true);
    try {
      await deleteExpense(expenseId);
      expensesContext.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Failed to delete the expense!");
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function submitHandler(data) {
    setIsLoading(true);

    try {
      if (isEdit) {
        await updateExpense(expenseId, data);
        expensesContext.updateExpense(expenseId, data);
        navigation.goBack();
      } else {
        const id = await storeExpense(data);
        expensesContext.addExpense({...data, id});
        navigation.goBack();
      }
    } catch (error) {
      setError("Failed to save the expense!");
      setIsLoading(false);
    }
  }

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
    <View style={styles.container}>
      <ExpenseForm
        expense={expense}
        isEdit={isEdit}
        onSubmit={submitHandler}
        onCancel={cancelHandler}
      />
      {
        isEdit && <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}/>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  },
});

export default ManageExpensesScreen;