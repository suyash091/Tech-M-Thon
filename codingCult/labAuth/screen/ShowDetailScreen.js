import React, { useState, useEffect } from "react";
import { StyleSheet, View, Picker } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import firebaseConfig from "../constants/firebaseConfig";
import { ScrollView } from "react-native";

import FormDisplay from "../components/FormDisplay";
// import Input from "../components/Input";

const ShowDetailScreen = (props) => {
  const [inputDuration, setInputDuration] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Confidential");
  const [volunteerData, setVolunteerData] = useState("");
  const [currentLab, setCurrentLab] = useState("");

  //   var volunteerData = {};
  //   var currentLab = {};
  

  const volunteerRef = firebaseConfig
    .database()
    .ref("/volunteers")
    .child(props.volunteerId);

  const postEntriesRef = volunteerRef.child("labsAccessed");

  const currentTechnicianRef = firebaseConfig
    .database()
    .ref("/technicians")
    .child(props.userData.uid);

  useEffect(() => {
    volunteerRef.on("value", (snap) => {
      setVolunteerData(snap.val());
    });
    currentTechnicianRef.on("value", (snap) => {
      setCurrentLab(snap.val());
    });
  }, []);

  var currentDate = (sp) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();
    var hr = today.getHours();
    var mn = today.getMinutes();
    var sec = today.getSeconds();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + sp + mm + sp + yyyy + sp + hr + sp + mn + sp + sec;
  };

  const OnInputDuration = (duration) => {
    setInputDuration(duration);
  };

  const onSubmit = () => {
    const dateD = currentDate("-");
    postEntriesRef.child(currentLab.lab).update(
      {
        [dateD]: {
          technician: props.userData.uid,
          duration: inputDuration,
          phone: volunteerData.phone.toString(),
          reason: selectedValue,
        },
      },
      (err) => {
        if (err) {
          console.log("something wrong");
        } else {
          setVolunteerData("");
          setCurrentLab("");
        }
      }
    );
  };

  if ((currentLab && volunteerData)) {
    if (!volunteerData.hasOwnProperty("labsAccessed")) {
      console.log(volunteerData);
      return (
        <View style={styles.screen}>
          <Text style={styles.title}>Welcome</Text>
          <Text>
            {" "}
            First Time Visiting this lab, No other labs visited in the past{" "}
          </Text>
          <ScrollView style={styles.inputContainer}>
            <Input
              label={"Lab Id"}
              value={currentLab.lab.toString()}
              editable={false}
              style={styles.input}
            />
            <Input
              label={"Volunteer PCT ID"}
              value={props.volunteerId}
              editable={false}
            />
            <Input label={"Date"} value={currentDate("-")} editable={false} />
            <Input
              label={"Technician Id"}
              value={props.userData.uid.toString()}
              editable={false}
            />
            <Input
              label={"Duration"}
              onChangeText={OnInputDuration}
              value={inputDuration.toString()}
              placeHolder="Duration"
            />
            <Input label={"Phone No"} value={volunteerData.phone.toString()} />
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Confidential" value="Confdential" />
                <Picker.Item label="Super-Secret" value="Super-secret" />
                <Picker.Item label="Reason-1" value="Reason-1" />
                <Picker.Item label="Reason-2" value="Reason-2" />
              </Picker>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Submit"
                onPress={onSubmit}
                icon={<Icon name="arrow-right" size={15} color="white" />}
              />
            </View>
            <View style={styles.button}>
              <Button title="Scan Again" onPress={props.backToWelcome} />
            </View>
          </View>

          <Button title="Scan Again" onPress={props.backToWelcome} />
        </View>
      );
    } else if (volunteerData.labsAccessed.hasOwnProperty(currentLab.lab)) {
      const history = volunteerData.labsAccessed[currentLab.lab];
      console.log(history["25-05-2020-8-50-26"]);
      
      //   const h = history.keys();
    //   console.log(history.isFrozen());

      return (
        <View style={styles.screen}>
          <Text style={styles.title}>Visited this lab for {history["25-05-2020-8-50-26"].reason} </Text>
          <ScrollView style={styles.inputContainer}>
            <Input
              label={"Lab Id"}
              value={currentLab.lab.toString()}
              editable={false}
              style={styles.input}
            />
            <Input
              label={"Volunteer PCT ID"}
              value={props.volunteerId.toString()}
              editable={false}
            />
            <Input label={"Date"} value={currentDate("-")} editable={false} />
            <Input
              label={"Technician Id"}
              value={props.userData.uid.toString()}
              editable={false}
            />
            <Input
              label={"Duration"}
              onChangeText={OnInputDuration}
              value={inputDuration.toString()}
              placeHolder="Duration"
            />
            <Input
              label={"Phone No"}
              value={volunteerData.phone.toString()}
              editable={true}
            />
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Confidential" value="Confdential" />
                <Picker.Item label="Super-Secret" value="Super-secret" />
                <Picker.Item label="Reason-1" value="Reason-1" />
                <Picker.Item label="Reason-2" value="Reason-2" />
              </Picker>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Submit"
                onPress={onSubmit}
                icon={<Icon name="arrow-right" size={15} color="white" />}
              />
            </View>
            <View style={styles.button}>
              <Button title="Scan Again" onPress={props.backToWelcome} />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.screen}>
          <Text style={styles.title}>First Time Visiting this lab</Text>
          <ScrollView style={styles.inputContainer}>
            <Input
              label={"Lab Id"}
              value={currentLab.lab.toString()}
              editable={false}
              style={styles.input}
            />
            <Input
              label={"Volunteer PCT ID"}
              value={props.volunteerId.toString()}
              editable={false}
            />
            <Input label={"Date"} value={currentDate("-")} editable={false} />
            <Input
              label={"Technician Id"}
              value={props.userData.uid.toString()}
              editable={false}
            />
            <Input
              label={"Duration"}
              onChangeText={OnInputDuration}
              value={inputDuration}
              placeHolder="Duration"
            />
            <Input
              label={"Phone No"}
              value={volunteerData.phone.toString()}
              editable={true}
            />
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Confidential" value="Confdential" />
                <Picker.Item label="Super-Secret" value="Super-secret" />
                <Picker.Item label="Reason-1" value="Reason-1" />
                <Picker.Item label="Reason-2" value="Reason-2" />
              </Picker>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Submit"
                onPress={onSubmit}
                icon={<Icon name="arrow-right" size={15} color="white" />}
              />
            </View>
            <View style={styles.button}>
              <Button title="Scan Again" onPress={props.backToWelcome} />
            </View>
          </View>
        </View>
      );
    }
  } else {
    return (
      <View>
        <Button title="Scan Again" onPress={props.backToWelcome} />
      </View>
    );
  }
};

export default ShowDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    paddingBottom: 20,
  },
  inputContainer: {
    width: "90%",
    flex: 1,
    alignContent: "center",
  },
  input: {
    width: 100,
  },
  pickerContainer: {
    width: "100%",
  },
  picker: {
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    padding: 20,
  },
  button: {
    width: "40%",
  },
});
