import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import LoginScreen from "./screen/LoginScreen";
import WelcomeScreen from "./screen/WelcomeScreen";
import ShowDetailScreen from "./screen/ShowDetailScreen";

//  var labRef = firebase.database().ref().child('lab');
//  var technicianRef = firebase.database().ref().child('technician');
//  var volunteerRef = firebase.database().ref().child('volunteer');

export default function App() {
  // useEffect(() => {
  //   labRef.on('value', snap => {
  //     console.log(snap.val());
  //   })
  // }, []);

  // const createData = (data) => {
  //   volunteerRef.child('id').set(JSON.stringify(data), error => {
  //     if(error) {
  //       console.log(error);
  //       console.log(Failed);
  //     } else {
  //       console.log("Write Success");

  //     }
  //   });
  // }

  const [user, setUser] = useState("");
  const [scannedData, setScannedData] = useState("");

  const loginHandler = (data) => {
    setUser(data);
  };

  const logOutHandler = () => {
    setUser(null);
  };

  const scannedDataHandler = (data) => {
    setScannedData(data);
  };

  const backToWelcomeHandler = () => {
    setScannedData('');
  };

  let content = <LoginScreen loginHandler={loginHandler} />;

  if (user) {
    content = <WelcomeScreen scannedDataHandler={scannedDataHandler} />;
  }
  if (user && scannedData) {
    // createData(scannedData);
    content = (
      <ShowDetailScreen
        volunteerId={scannedData}
        backToWelcome={backToWelcomeHandler}
        userData = {user}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title={"Lab Authenticator"} userData={user} />
      {user ? <NavBar userData={user} logOutHandler={logOutHandler} /> : null}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
