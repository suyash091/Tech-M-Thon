import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";

import Input from "../components/Input";
import firebaseConfig from "../constants/firebaseConfig";

const LoginScreen = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const authListener = () => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        props.loginHandler(user);
      } else {
        props.loginHandler("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const onEmailChange = (enteredEmail) => {
    setEmail(enteredEmail);
  };
  const onPasswordChange = (enteredPassword) => {
    setPassword(enteredPassword);
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  const onSignIn = () => {
    if (email && password) {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          if (error) {
            Alert.alert("Try Again!", error.message, [
              { text: "Okay", style: "destructive", onPress: resetInput },
            ]);
          }
        });
    }
  };

  

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Technician Login</Text>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="ID"
          textContentType="emailAddress"
          onChangeText={onEmailChange}
          value={email}
        />

        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          textContentType="password"
          onChangeText={onPasswordChange}
          value={password}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Sign In" onPress={onSignIn} color="blue" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 25,
    alignItems: "center",
  },
  input: {
    width: 100,
    textAlign: "center",
  },
  inputContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    padding: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default LoginScreen;
