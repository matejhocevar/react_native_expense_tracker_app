import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "../../constants/styles";

const IconButton = ({icon, size, color, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: GlobalStyles.colors.primary50}}
      style={({pressed}) => [pressed && styles.pressed]}
    >
      <View style={styles.buttonContainer}>
        <Ionicons
          name={icon}
          size={size}
          color={color}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  }
});

export default IconButton;