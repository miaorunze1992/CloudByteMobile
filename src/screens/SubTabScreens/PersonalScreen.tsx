import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PersonalScreen = ({navigation}:any) => {
    return (
      <View style={styles.container}>
        <Text>PersonalScreen  TODO</Text>
        <Button
          title="Click Here"
          onPress={() => console.log('Button Clicked!')}
        />
      </View>
    );
};

export default PersonalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});