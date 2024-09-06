import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const AddExpense = ({ navigation }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [cardName, setCardName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("Phone Pe");
  const [expensesSpent, setExpensesSpent] = useState("");
  const [expenseGoal, setExpenseGoal] = useState("0");

  const route = useRoute();
  const userName = route.params?.username;

  const handleAddExpense = () => {
    // Perform actions to add the expense, e.g., save to database
    if (!expenseName.trim() || !expenseAmount.trim()) {
      // Show error message if either expense name or amount is empty
      alert("Please enter both expense name and amount.");
      return;
    }

    const now = new Date();
    const date = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const period = now.getHours() < 12 ? "AM" : "PM";
    const time = `${hours}:${minutes} ${period}`;
    const addExpense = {
      username: userName,
      expenses: {
        [expenseName]: [expenseAmount, date, time, filter, cardName],
      },
    };

    axios
      .post("http://192.168.0.169:3001/addExpenses", { data: addExpense })
      .then((response) => {
        console.log(response.data);
      })
      //redirect
      .catch((error) => {
        console.error(error);
      });

    // Simulating a successful operation
    // In a real application, you would handle success and failure appropriately
    setModalVisible(true);
  };

  // Fetch expenses from server
  async function fetchDetails() {
    try {
      let response = await fetch("http://192.168.0.169:3001/readFile");
      let data = await response.json();

      const userExpenses =
        data.users.find((user) => user.uniqId === userName)?.expenses || [];
      let total = 0;
      if (userExpenses) {
        userExpenses.forEach((item) => {
          const expenseName = Object.keys(item)[0];
          const expenseAmount = item[expenseName][0];
          total += parseFloat(expenseAmount);
        });
      }
      const goalAmount =
        data.users.find((user) => user.uniqId === userName)?.goalAmount || 0;
      setExpenseGoal(goalAmount);
      setExpensesSpent(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [userName]);
  function onChanged(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("Please enter numbers only");
      }
    }
    setExpenseAmount(newText);
  }

  function onChangedName(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        alert("Please enter characters only");
      } else {
        // your call back function
        newText = newText + text[i];
      }
    }
    setExpenseName(newText);
  }

  function showBudget(){
    if(parseFloat(expenseGoal) === 0){
      return "Please set Financial Goal, Total Expenses till now: " + (parseFloat(expensesSpent) + parseFloat(expenseAmount)); 
    }
    else if((parseFloat(expenseGoal) - (parseFloat(expensesSpent) +parseFloat(expenseAmount))) < 0){
      return "You Have exceded your goal limit by " + (parseFloat(expenseGoal) - (parseFloat(expensesSpent) +parseFloat(expenseAmount))) * -1;
    }
    else{
      return "Expense Left: " + (parseFloat(expenseGoal) - (parseFloat(expensesSpent) +parseFloat(expenseAmount)));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        value={expenseName}
        onChangeText={(text) => {onChangedName(text)}}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={(text) => onChanged(text)}
      />
      <View style={styles.filterDropdown}>
        <Picker
          selectedValue={filter}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
        >
          <Picker.Item label="Debit Card" value="Debit Card" />
          <Picker.Item label="Credit Card" value="Credit Card" />
          <Picker.Item label="Google Pay" value="Google Pay" />
          <Picker.Item label="Phone Pe" value="Phone Pe" />
          <Picker.Item label="Cash" value="Cash" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Card Name / UPI ID"
        value={cardName}
        onChangeText={(text) => setCardName(text)}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />

      {/* Modal for success message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Expense is Successfully Added</Text>
          <Text style={styles.modalText}>{showBudget()}</Text>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => {
              setModalVisible(false);
              // Code to execute when the user clicks "OK"
              // This is where you can put navigation.goBack() or any other action
              navigation.goBack();
            }}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  modalContainer: {
    marginTop:"30%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  okButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  okButtonText: {
    color: "white",
    fontSize: 16,
  },
  filterDropdown: {
    marginBottom: 10,
  },
});

export default AddExpense;
