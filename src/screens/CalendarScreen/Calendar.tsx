import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import styles from "./styles";

const CalendarScreen = ()=>{
    return (
        <View style={styles.container}>
        <Text>CalendarScreen TODO</Text>
        <Button
          title="Click Here"
          onPress={() => console.log('Button Clicked!')}
        />
      </View>
    )
}

export default CalendarScreen;

