// ReminderAndAlerts.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ReminderAndAlerts = () => {
  const [reminderText, setReminderText] = useState('');

  const handleSetReminder = () => {
    if (reminderText.trim() === '') {
      Alert.alert('Reminder Text is empty', 'Please enter a reminder text.');
      return;
    }

    // Perform actions to set the reminder, e.g., save to a database

    Alert.alert('Reminder Set', `You will be reminded: ${reminderText}`);
    setReminderText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminder and Alerts</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter reminder text"
        value={reminderText}
        onChangeText={(text) => setReminderText(text)}
      />
      <Button title="Set Reminder" onPress={handleSetReminder} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default ReminderAndAlerts;
