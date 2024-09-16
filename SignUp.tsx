import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function FoodByteSignUp({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    axios.post('https://foodbyte.pythonanywhere.com/signup/', {
      email: email,
      password: password,
    })
    .then(response => {
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Home');  // Navigate to Home screen
    })
    .catch(error => {
      Alert.alert('Error', 'Signup failed: ' + (error.response ? error.response.data : error.message));
    });
  };

  return (
    <LinearGradient colors={['#F40F0F', '#800080']} style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.logoContainer}>
          <Image source={require('./logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>food byte</Text>
          <Text style={styles.tagline}>Delivering flavor, one byte at a time</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#000000"
            value={name}
            onChangeText={setName} // Still captures the name, but not sent to API
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#000000"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          
          <Text style={styles.signInText}>
            Already a user? <Text style={styles.signInLink}>sign in</Text>
          </Text>
        </View>
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
    justifyContent: 'space-between',
    padding: 35,
    paddingBottom: 190,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 90,
  },
  logo: {
    width: 89,
    height: 68,
    marginBottom: 10,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 36,
    color: '#1F0D85',
  },
  tagline: {
    fontSize: 14,
    color: '#1F0D85',
  },
  formContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 40,
    padding: 20,
    width: '100%',
    marginTop: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    color: '#000000',
    backgroundColor: 'rgba(133, 129, 125, 0.51)',
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
    color: '#000000',
    textAlign: 'center',
    marginTop: 15,
  },
  signInLink: {
    fontWeight: 'bold',
  },
});
