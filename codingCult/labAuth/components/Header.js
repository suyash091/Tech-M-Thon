import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import Colors from "../constants/color";

const Header = (props) => {

    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle} > {props.title} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: "100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.accent,
        alignItems: "center",
        justifyContent: "center",
      },
      headerTitle: {
        color: "black",
        fontSize: 28,
        fontWeight: "800",
      },
})

export default Header;