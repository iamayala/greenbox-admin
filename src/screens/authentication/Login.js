import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import styled from '../../style/styles';
import colors from '../../constants/colors';
import AppButton from '../../component/AppButton';
import fonts from '../../constants/fonts';
import { baseURL, get, post } from '../../utils/Api';
import ToastMessage from '../../component/ToastMessage';
import { storeLocalData } from '../../utils/Helpers';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Modal from 'react-native-modal';
import PromptModal from '../../component/PromptModal';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Login({ navigation }) {
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hidepwd, setHidepwd] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const handleLogin = () => {
    // navigation.navigate('OTP');
    Keyboard.dismiss();
    setLoading(true);
    post(`${baseURL}/admin/login`, {
      admin_name: name,
      admin_password: password,
    })
      .then((res) => {
        if (res.data.status == 404) {
          setError('Wrong credentials. Please try again!');
          setname('');
          setPassword('');
          setLoading(false);
        } else if (res.data.status == 200) {
          handleSaveToLocal(res.data.data);
          saveNotificationToken(res.data.data);
        } else if (res.data.status == 204) {
          // setrecovermodal(true);
          setname('');
          setPassword('');
          setError('Oops! Access Permission is no loner valid!');
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError('An error occurred! Try again!');
      });
  };

  const saveNotificationToken = (data) => {
    console.log(data);
    // post(`${baseURL}/notificationtoken`, {
    //   customer_id: data[0].customer_id,
    //   notification_token: expoPushToken,
    // }).then((res) => {
    //   console.log(res.data);
    //   console.log(res.data);
    // });
  };

  const handleSaveToLocal = (data) => {
    storeLocalData('@ADMINDATA', [{ ...data[0], offline: false }])
      .then(() => {
        setname('');
        setPassword('');
        setLoading(false);
        navigation.navigate('MainStack');
      })
      .catch((err) => {
        setError('Something went wrong! Please try again!');
        setPhone(''), setPassword('');
        setLoading(false);
      });
  };

  return (
    <AppScreen>
      {error && (
        <ToastMessage
          label={error}
          style={{ backgroundColor: colors.danger }}
          onPress={() => setError(null)}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={80}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            keyboardShouldPersistTaps="always">
            <View style={{ height: 200 }} />
            <Text style={styled.header}>
              <Text style={{ color: colors.primary }}>Vendor</Text> Login
            </Text>
            <Text style={[styled.subheader, { marginBottom: 25 }]}>
              Enter your username and password
            </Text>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Admin Username</Text>
              <View style={styled.inputField}>
                <TextInput
                  style={styled.textInput}
                  placeholder="Username"
                  value={name}
                  onChangeText={(e) => setname(e)}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Password</Text>
              <View style={styled.inputField}>
                <TextInput
                  style={styled.textInput}
                  secureTextEntry={hidepwd}
                  placeholder="Password"
                  value={password}
                  onChangeText={(e) => setPassword(e)}
                />
                <TouchableOpacity onPress={() => setHidepwd(!hidepwd)}>
                  <Feather name={hidepwd ? 'eye-off' : 'eye'} size={16} color={colors.iconDark} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ marginTop: 10, marginBottom: 15, display: 'none' }}>
                <Text
                  style={{ fontFamily: fonts.medium, color: colors.textGrey, textAlign: 'right' }}>
                  Forgot Password{' '}
                </Text>
              </TouchableOpacity>

              <AppButton
                onPress={name == '' || password == '' || loading ? () => {} : () => handleLogin()}
                style={{
                  backgroundColor: name == '' || password == '' ? colors.textGrey : colors.primary,
                }}
                label="Login"
                loading={loading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

export default Login;
