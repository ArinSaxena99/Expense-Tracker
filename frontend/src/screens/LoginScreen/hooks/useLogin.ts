import { useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emailRegex, passwordRegex } from '../../../utils/validators';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LOGIN_USER } from '../../../graphql/mutation';

export const useLogin = (navigation: NativeStackNavigationProp<any>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: async (data) => {
      const token = data.login.token;
      await AsyncStorage.setItem('token', token);
      Alert.alert('Success', 'User signed in successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    },
    onError: error => {
      Alert.alert('Error', error.message);
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }
    if (!emailRegex.test(email)) {
      return Alert.alert('Wrong email', 'Please enter a valid email address');
    }
    if (!passwordRegex.test(password)) {
      return Alert.alert('Wrong password', 'Password must be at least 6 characters, including a number and a letter');
    }

    LoginUser({ variables: { email, password } });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
  };
};
