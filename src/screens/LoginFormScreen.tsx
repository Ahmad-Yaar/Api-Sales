
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import type { PropsWithChildren } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';



const LoginFormScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    axios.post('', {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  
  return (
    <View style={styles.container}>
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

      <CheckBox
        style={styles.checkbox}
        title="Remember Me"
        checked={rememberMe}
        onPress={() => setRememberMe(!rememberMe)}
      />

      <Button icon="login" mode="contained"  onPress={handleLogin}
      >
        Login Hello
      </Button>


    </View>
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
