import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './FloatingAddButton.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddExpense'
>;
const FloatingAddButton = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <TouchableOpacity
        style={styles.FloatingBtn}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingAddButton;
