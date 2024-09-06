import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal, // Import Modal component
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState(null);
  const [filter, setFilter] = useState("all"); // Default filter: all
  const [deleteItem, setDeleteItem] = useState(null); // State to store item to delete
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation modal

  const route = useRoute();
  const userName = route.params?.username;

  // Fetch expenses from server
  async function fetchDetails() {
    try {
      let response = await fetch("http://192.168.0.169:3001/readFile");
      let data = await response.json();

      const userExpenses =
        data.users.find((user) => user.uniqId === userName)?.expenses || [];
      setExpenses(userExpenses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [userName]);

  // Function to handle deleting an expense
  const handleDelete = (item) => {
    setDeleteItem(item); // Set item to delete
    setShowConfirmation(true); // Show confirmation modal
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    axios
      .post("http://192.168.0.169:3001/deleteExpense", {
        data: deleteItem,
        username: userName,
      })
      .then((response) => {
        console.log(response.data);
        // Fetch updated expenses after deletion
        fetchDetails();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setShowConfirmation(false); // Hide confirmation modal
      });
  };

  // Calculate total amount of expenses
  const calculateTotal = (expenses) => {
    let total = 0;
    if (expenses) {
      expenses.forEach((item) => {
        const expenseName = Object.keys(item)[0];
        const expenseAmount = item[expenseName][0];
        total += parseFloat(expenseAmount);
      });
    }
    return total.toFixed(); // Return total amount with 2 decimal places
  };

  // Filter expenses based on selected filter
  const filteredExpenses = () => {
    const currentDate = new Date(); // Get the current date

    switch (filter) {
      case "weekly":
        // Filter expenses for the current week
        return expenses.filter((item) => {
          const expenseDate = new Date(item[Object.keys(item)[0]][1]); // Parse expense date
          const diffInDays = Math.floor(
            (currentDate - expenseDate) / (1000 * 60 * 60 * 24)
          ); // Calculate difference in days
          return diffInDays <= 7; // Return expenses within the last 7 days
        });
      case "monthly":
        // Filter expenses for the current month
        return expenses.filter((item) => {
          const expenseDate = new Date(item[Object.keys(item)[0]][1]); // Parse expense date
          return expenseDate.getMonth() === currentDate.getMonth(); // Return expenses for the current month
        });
      case "yearly":
        // Filter expenses for the current year
        return expenses.filter((item) => {
          const expenseDate = new Date(item[Object.keys(item)[0]][1]); // Parse expense date
          return expenseDate.getFullYear() === currentDate.getFullYear(); // Return expenses for the current year
        });
      default:
        return expenses;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense List</Text>
      {/* Filter dropdown */}
      <View style={styles.filterDropdown}>
        <Picker
          selectedValue={filter}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
        >
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
          <Picker.Item label="Yearly" value="yearly" />
          <Picker.Item label="All" value="all" />
        </Picker>
      </View>
      <View style={styles.expenseItem2}>
        <Text style={styles.expenseItem1}>Expense Name</Text>
        <Text style={styles.expenseItem1}>Date</Text>
        <Text style={styles.expenseItem1}>Time</Text>
        <Text style={styles.expenseItem1}>Transaction Type</Text>
        <Text style={styles.expenseItem1}>Transaction Name</Text>
        <Text style={styles.expenseItem1}>Rupees</Text>
        <Text style={styles.expenseItem1}>Action</Text>
      </View>
      {/* Expense list */}
      {expenses === null ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {filteredExpenses().length > 0 ? (
            <FlatList
              data={filteredExpenses()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const expenseName = Object.keys(item)[0];
                const expenseAmount = item[expenseName][0];
                const Date = item[expenseName][1];
                const Time = item[expenseName][2];
                const cardOption = item[expenseName][3];
                const cardName = item[expenseName][4];
                return (
                  <View style={styles.expenseItem}>
                    <Text style={styles.expenseItem6}>{expenseName}</Text>
                    <Text style={styles.expenseItem6}>{Date}</Text>
                    <Text style={styles.expenseItem6}>{Time}</Text>
                    <Text style={styles.expenseItem6}>{cardOption}</Text>
                    <Text style={styles.expenseItem6}>{cardName}</Text>
                    <Text style={styles.expenseItem6}>₹{expenseAmount}</Text>
                    <TouchableOpacity
                      style={styles.expenseItem6}
                      onPress={() => handleDelete(item)}
                    >
                      <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : (
            <Text>No expenses available.</Text>
          )}
          {/* Total amount */}
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmountText}>Total:</Text>
            <Text style={styles.totalAmountValue}>
              ₹{calculateTotal(filteredExpenses())}
            </Text>
          </View>
          {/* Confirmation Modal */}
          <Modal
            visible={showConfirmation}
            transparent={true}
            animationType="fade"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete this expense?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={()=>confirmDelete()}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowConfirmation(false)}
                  >
                    <Text style={styles.modalButtonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f0f0f0", // Add background color
    alignItems: "center",
  },
  expenseItem1: {
    flex: 1,
    color: "white",
    fontWeight: "bold", // Add bold font weight
    textAlign: "center",
  },
  expenseItem6: {
    flex: 1,
    color: "black",
    fontWeight: "bold", // Add bold font weight
    textAlign: "center",
  },
  expenseItem2: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "black",
    alignItems: "right", // Align items in the center horizontally
  },
  totalAmountContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  totalAmountValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  deleteButton: {
    color: "red",
    alignSelf: "center",
  },
  filterDropdown: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft:"20%",
    width: "50%",
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ExpenseList;
