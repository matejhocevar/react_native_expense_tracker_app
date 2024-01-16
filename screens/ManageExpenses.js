import {StyleSheet, View} from "react-native";
import {useLayoutEffect} from "react";
import IconButton from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import Button from "../components/ui/Button";

const ManageExpensesScreen = ({route, navigation}) => {
  const expenseId = route.params?.expenseId;
  const isEdit = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  function deleteExpenseHandler() {
    console.log("Deleting expense with id", expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    console.log("Canceling modal");
    navigation.goBack();
  }

  function confirmHandler() {
    console.log("Confirm");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEdit ? "Update" : "Add"}</Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
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