import React, { useContext, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { styles } from './SettingsScreen.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, TabParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../../graphql/query';

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainApp'
>;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const SettingsScreen = () => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });

  const request = useQuery(GET_USER_INFO);
  console.log(request);
  const { setIsLoggedIn } = useContext(AuthContext);

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const startY = useSharedValue(SCREEN_HEIGHT);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Logged Out');
      setIsLoggedIn(false);
    } catch (err) {
      console.log('Error logging out user!');
    }
  };

  const openProfile = () => {
    setProfileVisible(true);
    translateY.value = withSpring(SCREEN_HEIGHT * 0.1, {
      damping: 60,
      stiffness: 300,
    });
  };

  const closeProfile = () => {
    translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20 }, () => {
      runOnJS(setProfileVisible)(false);
    });
  };

  // Gesture for swiping down
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate(event => {
      translateY.value = Math.max(
        SCREEN_HEIGHT * 0.1,
        startY.value + event.translationY,
      );
    })
    .onEnd(() => {
      if (translateY.value > SCREEN_HEIGHT * 0.5) {
        runOnJS(closeProfile)();
      } else {
        translateY.value = withSpring(SCREEN_HEIGHT * 0.1, { damping: 20 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    width: SCREEN_WIDTH,
    alignSelf: 'center',
  }));
  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.1],
      [0, 0.5],
    );
    return { opacity };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.item} onPress={openProfile}>
        <Text style={styles.itemText}>Profile</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <View style={styles.leftContainer}>
          <Text style={styles.itemTextLogout}>Logout</Text>
          <Ionicons name="log-out-outline" size={22} color="red" />
        </View>

        <Ionicons name="chevron-forward-outline" size={24} color="#000" />
      </TouchableOpacity>

      {/* <Modal></Modal> */}
      {profileVisible && (
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={closeProfile}
          />
        </Animated.View>
      )}

      {/* Bottom Sheet */}
      {profileVisible && (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.bottomSheet, animatedStyle]}>
            <View style={styles.dragIndicator} />
            <Text style={styles.sheetTitle}>Profile Details</Text>
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Name:</Text>
              <Text style={styles.profileValue}>John Doe</Text>
            </View>
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Email:</Text>
              <Text style={styles.profileValue}>john@example.com</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
