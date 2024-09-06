// RegisterPage.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");

  // Function to validate phone number format (10 digits)
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }
  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleRegister = () => {
    // Check if any field is empty
    if (!username || !email || !phoneNumber || !password) {
      alert("All fields are required");
      return;
    }
    // Check if phone number is valid
    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Invalid phone number format");
      return;
    }
    if (!isValidEmail(email)) {
      // If email is invalid, set flag to false
      alert("Invalid email format");
      // Optionally, you can display an error message to the user
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be 6 to 8 characters long and include at least one special character (!@#$%^&*)"
      );
      return;
    }
    // Perform your registration logic here
    // For simplicity, we'll just display an alert with the entered information
    const registrationInfo = {
      username: username,
      email: email,
      phNumber: phoneNumber,
      password: password,
      uniqId: generateUniqueId(),
    };
    axios
      .post("http://192.168.0.169:3001/writeToFile", { data: registrationInfo })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    Alert.alert("Registration Successful");
    navigation.navigate("Login");
  };

  // Function to generate a random 8-digit ID
  const generateUniqueId = () => {
    let id = "";
    const digits = "0123456789";
    for (let i = 0; i < 8; i++) {
      id += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return id;
  };

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
    setPhoneNumber(newText);
  }
  console.log(username, email, phoneNumber, password);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        maxLength={10}
        placeholder="Phone Number"
        onChangeText={(text) => onChanged(text)}
        value={phoneNumber}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#b0b0b0",
    backgroundColor: "#ffffff",
    color: "black",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  numberInput: {
    borderWidth: 2,
    borderColor: "#b0b0b0",
    backgroundColor: "#ffffff",
    color: "black",
    width: "98%",
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 16,
  },
  loginText: {
    color: "#3498db",
    fontSize: 16,
  },
});

export default RegisterPage;
