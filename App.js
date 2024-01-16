import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpensesScreen from "./screens/ManageExpenses";
import RecentExpensesScreen from "./screens/RecentExpenses";
import AllExpensesScreen from "./screens/AllExpenses";
import {GlobalStyles} from "./constants/styles";
import {Ionicons} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return <BottomTabs.Navigator screenOptions={{
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: "white",
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
  }}>
    <BottomTabs.Screen
      name="RecentExpenses"
      component={RecentExpensesScreen}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color}/>
      }}
    />
    <BottomTabs.Screen
      name="AllExpenses"
      component={AllExpensesScreen}
      options={{
        title: "All Expenses",
        tabBarLabel: "All",
        tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color}/>
      }}
    />
  </BottomTabs.Navigator>
}

const App = () => {
  return (
    <>
      <StatusBar style="light"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpensesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
