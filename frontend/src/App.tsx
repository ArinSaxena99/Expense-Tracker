import { ApolloProvider } from '@apollo/client';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import client from './graphql/apolloClient';
import RootNavigator from './navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createNativeStackNavigator();

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
