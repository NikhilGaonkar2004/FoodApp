import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App'; // Import the RootStackParamList type

// Define the type for navigation prop
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeProps {
  navigation: WelcomeScreenNavigationProp;
}

export default function Welcome({ navigation }: WelcomeProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./bg.png')}
        style={styles.burgerImage}
        resizeMode="cover"
      >
        <Image
          source={require('./El.png')}
          style={styles.ellipse}
        />

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>India's NO. 1 food delivery app</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}  // Navigate to SignIn
        >
          <LinearGradient
            colors={['rgba(242,254,21,0.75)', 'rgba(145,152,13,0.75)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Sign In</Text>
            <Ionicons name="arrow-forward" size={24} color="#000" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}  // Navigate to SignUp
        >
          <LinearGradient
            colors={['#DFEA13', '#7E840B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
            <Ionicons name="arrow-forward" size={24} color="#000" />
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  burgerImage: {
    flex: 1,
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ellipse: {
    position: 'absolute',
    right: -165,
    bottom: -92,
    width: 841,
    height: 772,
  },
  titleWrapper: {},
  title: {
    fontSize: 50,
    paddingBottom: 100,
    fontWeight: 'bold',
    color: '#1F0D85',
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 30,
    paddingBottom: 60,
    overflow: 'hidden',
    width: '90%',
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});
