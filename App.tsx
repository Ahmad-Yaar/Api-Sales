/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import type { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import LoginFormScreen from './src/screens/LoginFormScreen';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './src/screens/Dashboard';
import Visits from './src/screens/Visits';
import VisitDetails from './src/screens/VisitDetails';
import Recovery from './src/screens/Recovery';
const Stack = createStackNavigator();


export default function App() {



  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="VisitDetails">
          {/* <Stack.Screen name="LoginFormScreen" component={LoginFormScreen}
          options={{ headerShown: false }}
        /> */}
          {/* <Stack.Screen name="Visits" component={Visits}
          options={{ headerShown: false }}
        /> */}
          <Stack.Screen name="VisitDetails" component={VisitDetails}
                  options={{ headerShown: false }}

        />
          <Stack.Screen name="Recovery" component={Recovery}
                  options={{ headerShown: false }}

        />
         
        {/* <Stack.Screen name="Dashboard" component={Dashboard}
          options={{ headerShown: false }}
        />  */}
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },

});

