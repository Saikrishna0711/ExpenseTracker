import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Profile = () => {
  const route = useRoute();
  const userName = route.params?.username;

  const [user, setUser] = useState(null);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

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

  const handleEmailEdit = () => {
    setEditingEmail(true);
    setNewEmail(user.email);
  };

  function onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert('Please enter numbers only');
      }
    }
    setNewPhoneNumber(newText);
  }

  const handlePhoneNumberEdit = () => {
    setEditingPhoneNumber(true);
    setNewPhoneNumber(user.phNumber);
  };
  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate phone number format (10 digits)
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  // Inside the saveChanges function
  const saveChanges = () => {
    let updatedData = {};
    let isValid = true; // Flag to track validation

    // Validate email format if editing email
    if (editingEmail && !isValidEmail(newEmail)) {
      // If email is invalid, set flag to false
      isValid = false;
      alert("Invalid email format");
      // Optionally, you can display an error message to the user
    }

    // Validate phone number format if editing phone number
    if (editingPhoneNumber && !isValidPhoneNumber(newPhoneNumber)) {
      // If phone number is invalid, set flag to false
      isValid = false;
      alert("Invalid phone number format");
      // Optionally, you can display an error message to the user
    }

    // If any validation failed, do not proceed with saving changes
    if (!isValid) {
      return;
    }

    // Proceed with saving changes
    if (editingEmail) {
      // Update user email in local state
      setUser((prevUser) => ({
        ...prevUser,
        email: newEmail,
      }));

      // Add updated email to the data to send to the server
      updatedData.email = newEmail;
    }
    if (editingPhoneNumber) {
      // Update user phone number in local state
      setUser((prevUser) => ({
        ...prevUser,
        phNumber: newPhoneNumber,
      }));
      // Add updated phone number to the data to send to the server
      updatedData.phNumber = newPhoneNumber;
    }

    // Send updated data to the server if any changes were made
    if (Object.keys(updatedData).length > 0) {
      axios
        .post("http://192.168.0.169:3001/updateUserData", {
          username: userName,
          updatedData,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setEditingEmail(false);
    setEditingPhoneNumber(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={250}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.title}>Profile Information</Text>
      </View>
      <View style={styles.body}>
        {user === null ? (
          <Text style={styles.error}>No user data available</Text>
        ) : (
          <>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{user.username}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Email:</Text>
              {editingEmail ? (
                <TextInput
                  style={styles.input}
                  value={newEmail}
                  onChangeText={setNewEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter new email"
                />
              ) : (
                <Text style={styles.value}>{user.email}</Text>
              )}
              <TouchableOpacity onPress={handleEmailEdit}>
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#4CAF50"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Phone Number:</Text>
              {editingPhoneNumber ? (
                <TextInput
                  style={styles.input}
                  value={newPhoneNumber}
                  onChangeText={onChanged}
                  keyboardType="numeric"
                  placeholder="Enter new phone number"
                />
              ) : (
                <Text style={styles.value}>{user.phNumber}</Text>
              )}
              <TouchableOpacity onPress={handlePhoneNumberEdit}>
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#4CAF50"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
            {editingEmail || editingPhoneNumber ? (
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#4CAF50",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  body: {
    padding: 20,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
  },
  value: {
    flex: 3,
    fontSize: 18,
    fontFamily: "System",
  },
  error: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
  icon: {
    textAlign: "center",
  },
  editIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 3,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Profile;
