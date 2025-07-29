import { ApolloProvider } from '@apollo/client';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import client from './graphql/apolloClient';
import RootNavigator from './RootNavigator';


const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
    <RootNavigator/>
    </ApolloProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
