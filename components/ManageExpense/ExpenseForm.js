import {StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../ui/Button";
import {getFormattedDate} from "../../utils/formatters/date";
import {GlobalStyles} from "../../constants/styles";

const ExpenseForm = ({isEdit, expense, onSubmit, onCancel}) => {
  const [formValues, setFormValues] = useState({
    amount: {
      value: expense?.amount?.toString() ?? '',
      isValid: true
    },
    date: {
      value: getFormattedDate(expense?.date) ?? '',
      isValid: true
    },
    description: {
      value: expense?.description ?? '',
      isValid: true
    },
  });

  function formChangeHandler(id, value) {
    setFormValues((state) => {
      return {...state, [id]: {value, isValid: true}}
    });
  }

  function submitHandler() {
    const data = {
      amount: +formValues.amount.value,
      date: new Date(formValues.date.value),
      description: formValues.description.value,
    };

    const amountIsValid = !isNaN(data.amount) && data.amount > 0;
    const dataIsValid = data.date.toString() !== "Invalid Date";
    const descriptionIsValid = data.description.trim().length > 0;

    if (!amountIsValid || !dataIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid input", "Please check you input values");
      setFormValues((currentInputs) => {
        return {
          amount: {value: currentInputs.amount.value, isValid: amountIsValid},
          date: {value: currentInputs.date.value, isValid: dataIsValid},
          description: {value: currentInputs.description.value, isValid: descriptionIsValid},
        }
      });
      return;
    }

    onSubmit(data);
  }

  const formIsInvalid = !formValues.amount.isValid || !formValues.date.isValid || !formValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!formValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => formChangeHandler("amount", value),
            value: formValues.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!formValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            minLength: 10,
            maxLength: 10,
            onChangeText: (value) => formChangeHandler("date", value),
            value: formValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!formValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => formChangeHandler("description", value),
          value: formValues.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your input data!</Text>}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{isEdit ? "Update" : "Add"}</Button>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  }
});

export default ExpenseForm;