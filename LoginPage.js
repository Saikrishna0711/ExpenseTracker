// LoginPage.js
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import userData from './data.json'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Swal from 'sweetalert2';
import expenseTrackerImg from "./assets/Expense_tracker.png";


const LoginPage = ({ navigation }) => {

  const [userData, setUserData] = useState(null)
  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const [showLogo, setShowLogo] = useState(true);
  const [uniqId, setuniqId] = useState(null);

  const route = useRoute()
  useEffect(() => {
    if (route.params?.redirected === "Login") {
      setPassword("")
      setUserName("")
    }
  }, [route])

  useEffect(() => {
    async function fetchDetails() {
      let response = await fetch('http://192.168.0.169:3001/readFile')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error:', error));
      setUserData(response)
    }
    fetchDetails()
  }, [userName])


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  function onTextChangeUserName(value) {
    setUserName(value)
  }
  function onTextChangePassword(value) {
    setPassword(value)
  }
  function handleLogin() {
    console.log(userName, password)
    let userfound = false
    let index = 0
    userData.users.forEach((user, i) => {
      if (userName === user.username && password === user.password) {
        userfound = true
        index = i
      }
    })
    if (userName === userData.users[index].username && password === userData.users[index].password) {
      setuniqId(userData.users[index].uniqId)
      navigation.navigate('Dashboard', { username: userData.users[index].uniqId });
    }
    else if (password !== userData.users[index].password) {
      alert("password is incorrect")
      // Swal.fire("password is incorrect!"); 
    }
    else {
      alert("Id or Password is incorrect")
      // Swal.fire("Id or Password is incorrect!");

    }
  }


  return (
    <View style={styles.container}>
      {/* Show logo for 2 seconds */}
      {showLogo && (
         <Image
         source={expenseTrackerImg}
         style={styles.image}
         resizeMode="center"
       />
      )}

      {/* Show the login form */}
      {!showLogo && (
        <>
          <View>
            <Text style={styles.heading}>Expense Tracker</Text>
          </View>
          <TextInput
            style={styles.textInput}
            value={userName}
            placeholder='Username'
            onChangeText={onTextChangeUserName}
          />
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={onTextChangePassword}
            onSubmitEditing={handleLogin}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}>
             
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { setPassword(""); setUserName(""); }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for different cover strategies
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)', // Semi-transparent white background
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#b0b0b0',
    backgroundColor: '#ffffff',
    color: 'black',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  heading: {
    fontSize: 30,
    paddingBottom: 24,
    color: '#333333',
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  registerText: {
    marginRight: 8,
    fontSize: 16,
    color: '#333333',
  },
  registerLink: {
    fontSize: 16,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default LoginPage;