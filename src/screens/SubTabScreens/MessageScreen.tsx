import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MessageScreen = ({navigation}:any) => {
    return (
      <View style={styles.container}>
        <Text>Message Screen TODO</Text>
        <Button
            title="Go to item screen...again"
            onPress={() => navigation.push("Item")}
        />
        <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
      </View>
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});