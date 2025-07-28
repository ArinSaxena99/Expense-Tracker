import { useState } from "react";
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGN_UP_USER } from '../../../graphql/mutation';
import { emailRegex, passwordRegex } from "../../../utils/validators";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export const useSignUp = (navigation: NativeStackNavigationProp<any>) => {
const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUpUser, { loading }] = useMutation(SIGN_UP_USER, {
      onCompleted: async data => {
        Alert.alert('Success', 'User signed up successfully!');
        const token = data.signup.token;
        await AsyncStorage.setItem('token', token);
      //   navigation.navigate('login');
      },
      onError: error => {
        console.log(error);
  
        Alert.alert('Error', error.message);
      },
    });

     const handleSignUp = () => {
        if (!name || !email || !password) {
          return Alert.alert('Error', 'Please fill all fields');
        }
        if (!emailRegex.test(email)) {
          return Alert.alert('Invalid email, please enter a valid email');
        }
        if (!passwordRegex.test(password)) {
          return Alert.alert(
            'weak password',
            'Password must be at least 8 characters long and include letters and numbers',
          );
        }
        signUpUser({ variables: { name, email, password } });
      };
      return {name,setName, email,setEmail,password, setPassword,handleSignUp}
}
