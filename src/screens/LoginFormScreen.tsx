
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import type { PropsWithChildren } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';


type SectionProps = PropsWithChildren<{
  title: string;
}>;
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, TextInput, Checkbox, Snackbar, ActivityIndicator } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

const LoginFormScreen = ({ navigation }: { navigation: any }) => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = () => {
    setLoading(true);
    fetch('https://api.apithreesixty.com/api/User/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        pin: pin,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSnackbarMessage(data.message);
          setSnackbarVisible(true);
          navigation.navigate('Dashboard');
        } else {
          setSnackbarMessage(data.message);
          setSnackbarVisible(true);
        }
        setUserData(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // Set loading to false when login process is complete (success or failure)
        setLoading(false);
      });
  };


  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <View >
          {/* Title */}
          <Text style={styles.title}>360 SalesApp</Text>

          {/* input fields to enter credential details */}
          <TextInput
            mode="outlined"
            label="Username"
            onChangeText={setUsername}
            right={<TextInput.Affix text="/100" />}
            style={styles.input}

          />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            onChangeText={setPassword}
            right={<TextInput.Affix text="/8" />}
            style={styles.input}

          />
          <TextInput
            mode="outlined"
            label="Pin"
            secureTextEntry
            value={pin}
            onChangeText={setPin}
            style={styles.input}

          />


          <Checkbox.Item
            label="Remember Me"
            color='#ef8130'
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
          />

          <Button icon="login" mode="contained" onPress={handleLogin}
            buttonColor='#ef8130'
          >
            {loading ? (
              <ActivityIndicator animating={true} color="white" />
            ) : (
              <Text>Login</Text>
            )}          
            </Button>
        </View >
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={5000}
      >
        {snackbarMessage}
      </Snackbar>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
    color: '#ef8130',
  },
  checkbox: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 10,
  },
});

export default LoginFormScreen;
