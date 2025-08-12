import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import EditExpenseScreen from '../screens/EditExpenseScreen/EditExpense';
import AddExpenseScreen from './../screens/AddExpenseScreen/AddExpense';
import AuthStack from './AuthStack/AuthStack';
import TabNavigator from './TabNavigator/TabNavigator';
import { RootStackParamList } from './types';

const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <RootStack.Screen name="MainApp" component={TabNavigator} />
            <RootStack.Screen name="EditExpense" component={EditExpenseScreen} />
            <RootStack.Screen name="AddExpense" component={AddExpenseScreen} />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
