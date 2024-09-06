import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';

const ExpenseAnalytics = () => {

  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const route = useRoute();
  const userName = route.params?.username;

  // Fetch expenses logic (replace with your actual data fetching logic)
  useEffect(() => {
    async function fetchDetails() {
      try {
        let response = await fetch('http://192.168.0.169:3001/readFile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        const userData = data.users.find(user => user.uniqId === userName);
        if (userData && userData.expenses) {
          setExpenses(userData.expenses);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching data. Please try again later.');
      }
    }
    fetchDetails();
  }, [userName]); // Fetch data when username changes

  // Ensure expenses is an array and not empty
  if (!Array.isArray(expenses) || expenses.length === 0) {
    // Handle the case of empty or invalid data
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Expense Analytics</Text>
        <Text>No valid data available for chart.</Text>
        {error && <Text>{error}</Text>}
      </View>
    );
  }

  // Prepare data for line chart
  const data = {
    labels: expenses.map((expense) => {
      const expenseKey = Object.keys(expense)[0];
      const expenseValue = expense[expenseKey];
      if (Array.isArray(expenseValue)) {
        const date = new Date(expenseValue[1]);
        return `${date.toLocaleDateString()}`; // Return formatted date string
      } else {
        return expenseKey;
      }
    }), // Extract expense names and dates
    datasets: [
      {
        data: expenses.map((expense) => {
          const expenseKey = Object.keys(expense)[0];
          const expenseValue = expense[expenseKey];
          if (Array.isArray(expenseValue)) {
            return Number(expenseValue[0]);
          } else {
            return Number(expenseValue); // Assuming it's a single expense entry
          }
        }), // Extract amount spent
      },
    ],
  };

  const lineChartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  // Render individual transaction item
  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>{item.date}</Text>
      <Text>{item.amount}</Text>
      {/* Add more details as needed */}
    </View>
  );

  // Get latest 10 transactions
  const latestTransactions = expenses
    .slice(0, 10)
    .map((expense) => {
      const expenseKey = Object.keys(expense)[0];
      const expenseValue = expense[expenseKey];
      const date = new Date(expenseValue[1]);
      return {
        date: date.toLocaleDateString(),
        amount: expenseValue[0],
        // Add more details as needed
      };
    });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense Analytics</Text>
      <ScrollView style={{ flex: 1 }}>
      <ScrollView horizontal={true}>
        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={expenses.length * 100} // Width of the chart based on the number of entries
            height={400}
            yAxisLabel="₹"
            yAxisSuffix=""
            fromZero={true}
            chartConfig={lineChartConfig}
            style={styles.chart}
            bezier
          />
        </View>
      </ScrollView>
      </ScrollView>
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionHeading}>Latest 10 Transactions</Text>
        <FlatList
          data={latestTransactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  transactionContainer: {
    marginTop: 20,
  },
  transactionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default ExpenseAnalytics;
