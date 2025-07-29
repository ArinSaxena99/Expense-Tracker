import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './SignUpScreen.styles';
import { useSignUp } from './hooks/useSignUp';
type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};
const SignUpScreen = ({ navigation }: Props) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
    loading,
  } = useSignUp(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.btnStyle, loading && { opacity: 0.5 }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading ? 'Signing Up...': 'Sign Up'}</Text>
        </TouchableOpacity>

        <View style={styles.link}>
          <Text style={styles.switchText}>Already have an account? </Text>

          <TouchableOpacity>
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
