import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function Forgot({ navigation }: any) {
  const [email, setEmail] = useState('');

  const handleForgot = () => {
    axios.post('https://foodbyte.pythonanywhere.com/forgot-password/', {
      email: email,
    })
    .then(response => {
      Alert.alert('Success', 'OTP sent to your email');
      navigation.navigate('VerifyOTP', { email });  // Navigate to VerifyOTP screen with email as parameter
    })
    .catch(error => {
      Alert.alert('Error', 'Failed to send OTP: ' + (error.response ? error.response.data : error.message));
    });
  };

  return (
    <LinearGradient colors={['#F40F0F', '#800080']} style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title} onPress={() => navigation.navigate('SignUp')} >Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000000"
          value={email}
          onChangeText={setEmail}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleForgot}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
        
        <Text style={styles.signInText}>
          Remembered your password? <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}>Sign In</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 35,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    fontSize: 20,
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 40,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
  },
  signInText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
  },
  signInLink: {
    fontWeight: 'bold',
  },
});
