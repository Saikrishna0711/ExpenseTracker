import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const ExpenseCategorization = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const route = useRoute();
  const userName = route.params?.username;

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
          setFilteredExpenses(userData.expenses);
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately, maybe set an error state
      }
    }
    fetchDetails();
  }, [userName]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (!text) {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter(expense => {
        const expenseKey = Object.keys(expense)[0];
        return expenseKey.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredExpenses(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense Categorization</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search expense..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>{Object.keys(item)[0]}</Text>
            <Text style={styles.expenseText}>{item[Object.keys(item)[0]].join(', ')}</Text>
          </View>
        )}
      />
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
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseText: {
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
});

export default ExpenseCategorization;
