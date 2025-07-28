import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import HomeScreen from './screens/HomeScreen/HomeScreen';


const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
      </Tab.Navigator> */}
    </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
