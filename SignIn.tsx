import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignIn({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('https://foodbyte.pythonanywhere.com/login/', {
      email: email,
      password: password,
    })
    .then(async response => {
      const { access_token, refresh_token } = response.data;
      
      // Store tokens in AsyncStorage
      try {
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('refresh_token', refresh_token);
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Home');  // Navigate to Home screen
      } catch (error) {
        console.error('Failed to save tokens', error);
      }
    })
    .catch(error => {
      Alert.alert('Error', 'Login failed: ' + (error.response ? error.response.data : error.message));
    });
  };
  

  return (
    <LinearGradient colors={['#F40F0F', '#800080']} style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000000"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000000"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('Forgot')}>
          Forgot Password?
        </Text>

        <Text style={styles.signUpText}>
          New to FoodByte? <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>Create an account</Text>
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
  forgotPasswordText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  signUpText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
  },
  signUpLink: {
    fontWeight: 'bold',
  },
});
