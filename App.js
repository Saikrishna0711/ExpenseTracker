import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import Dashboard from './Home';
import RegisterPage from './Register';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import ExpenseCategorization from './ExpenseCategorization';
import ReminderAndAlerts from './ReminderandAlerts';
import ExpenseAnalytics from './ExpenseAnalytics';
import FinancialGoalSetting from './FinancialGoalSetting';
import Profile from './Profile';
import testsidebar from './testsidebar';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        {/* <Stack.Navigator initialRouteName="Dashboard"> */}
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
          <Stack.Screen name="ExpenseList" component={ExpenseList} />
          <Stack.Screen name="ExpenseCategorization" component={ExpenseCategorization} />
          <Stack.Screen name="ReminderandAlerts" component={ReminderAndAlerts} />
          <Stack.Screen name="ExpenseAnalytics" component={ExpenseAnalytics} />
          <Stack.Screen name="FinancialGoalSetting" component={FinancialGoalSetting} />
          <Stack.Screen name="Profile" component={Profile} />
          {/* <Stack.Screen name="testsidebar" component={testsidebar} /> */}




        </Stack.Navigator>
    </NavigationContainer>
  );
}
