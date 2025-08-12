import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './LoginScreen.styles';
import { useLogin } from './hooks/useLogin';

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};

const LoginScreen = ({ navigation }: Props) => {
  const {email, setEmail, password, setPassword, handleLogin, loading} =
    useLogin(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.btnStyle, loading && { opacity: 0.5 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Loggin in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <View style={styles.link}>
          <Text style={styles.switchText}>Don't have an account? </Text>

          <TouchableOpacity>
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
