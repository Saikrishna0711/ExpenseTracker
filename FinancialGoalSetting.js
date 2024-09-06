// FinancialGoalSetting.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const FinancialGoalSetting = (navigation) => {
  const route = useRoute();
  const userName = route.params?.username;
  const [user, setUser] = useState(null);
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  useEffect(() => {
    async function fetchDetails() {
      try {
        let response = await fetch("http://192.168.0.169:3001/readFile");
        let data = await response.json();

        const userExpenses = data.users.find(
          (user) => user.uniqId === userName
        );
        setUser(userExpenses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDetails();
  }, []);
  function onChanged(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("please enter numbers only");
      }
    }
    setGoalAmount(newText);
  }
  const handleSetGoal = () => {
    if (!goalAmount || isNaN(goalAmount) || goalAmount <= 0) {
      alert("Please enter a valid goal amount.");
      return;
    }
    if (!goalDescription) {
      alert("Please enter a valid goal description.");
      return;
    }

    // Perform actions to set the financial goal, e.g., save to a database
    const goalSetting = {
      username: userName,
      goalSetting: {
        goalAmount: goalAmount,
        goalDescription: goalDescription,
      },
    };

    axios.post('http://192.168.0.169:3001/goalSetting', { data: goalSetting })
    .then(response => {
        console.log(response.data);
    })
    //redirect
    .catch(error => {
        console.error(error);
    });
    alert(`Financial goal set: ${goalDescription} - $${goalAmount}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Financial Goal Setting</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter goal amount"
        keyboardType="numeric"
        value={goalAmount}
        onChangeText={(text) => onChanged(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter goal description"
        value={goalDescription}
        onChangeText={(text) => setGoalDescription(text)}
      />
      <Button title="Set Financial Goal" onPress={handleSetGoal} />
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
});

export default FinancialGoalSetting;
