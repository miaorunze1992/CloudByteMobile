import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ItemScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Item Screen TODO</Text>
        <Button
          title="Click Here"
          onPress={() => console.log('Button Clicked!')}
        />
      </View>
    );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});