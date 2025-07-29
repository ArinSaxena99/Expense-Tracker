import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './navigation/AuthStack/AuthStack'
import TabNavigator from './navigation/TabNavigator/TabNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RootNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    useEffect(() => {
        const checkLogin = async () => {
          const token = await AsyncStorage.getItem("token");
          setIsLoggedIn(!!token)
        };
        checkLogin();
    },[])

    if(isLoggedIn === null) {
        return (
            <View style={{ flex:1 , justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
  return (
    <NavigationContainer>
        {isLoggedIn ? <TabNavigator/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})