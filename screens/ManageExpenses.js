import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpensesScreen = ({route, navigation}) => {
  const expensesContext = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const expense = expensesContext.expenses.find((e) => e.id === expenseId);
  const isEdit = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  function deleteExpenseHandler() {
    expensesContext.deleteExpense(expenseId);

    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function submitHandler(data) {
    if (isEdit) {
      expensesContext.updateExpense(expenseId, data);
    } else {
      expensesContext.addExpense(data);
    }

    navigation.goBack();
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