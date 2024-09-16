import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',  // Black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#FFFFFF',  // White text
  },
});
