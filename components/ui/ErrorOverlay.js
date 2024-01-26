import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import Button from "./Button";

const ErrorOverlay = ({children, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={[styles.text, styles.message]}>{children}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  message: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
  }
});
export default ErrorOverlay;