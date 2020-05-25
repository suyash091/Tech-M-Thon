import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
    return(
        <TextInput {...props} style={{...styles.input, ...props.styles}} />
    );

};

const styles = StyleSheet.create({
      input: {
        width: "100%",
        borderColor: "grey",
        borderWidth: 2,
        padding: 10,
        marginBottom: 10
      },
});

export default Input;