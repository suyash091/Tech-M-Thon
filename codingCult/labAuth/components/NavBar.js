import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

import firebaseConfig from "../constants/firebaseConfig";
import { Alert } from "react-native";

const NavBar = (props) => {

    const onLogout = () => {
        firebaseConfig.auth().signOut().then( () => {
            console.log("Sign Out Successfully");            
            return;
        }).catch( error => {
            if(error) {
                console.log(error.message);                
                Alert.alert("An error occurred !");
            }
        }

        )
    }

    

  return (
    <View style={styles.screen}>
      {props.userData.email ? (
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Welcome {props.userData.email} </Text>
        </View>
      ) : null}

      <View>
        <Button title="Sign Out" color="red" onPress={onLogout} />
        
      </View>
      
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  screen: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  titleContainer: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
});
