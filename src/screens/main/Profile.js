import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import styled from '../../style/styles';
import colors from '../../constants/colors';
import AppButton from '../../component/AppButton';
import fonts from '../../constants/fonts';
import ToastMessage from '../../component/ToastMessage';
import { baseURL, post } from '../../utils/Api';

const styles = StyleSheet.create({
  topBtn: {
    height: 40.67,
    width: 40.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
});

function Profile({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pwd, setPwd] = useState('');
  const [hidePwd, setHidePwd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [strength, setStrength] = useState('');

  const verify = (e) => {
    const dstPhone = e.split('');
    if (dstPhone.length < 9) {
      setError('Please make sure the phone number is valid');
    } else if (dstPhone[0] !== '7') {
      setError('Please use the right format ex. 7xxxxxxxx');
    } else if (strength == 'Weak') {
      setError('Please make sure you use a stronger password!');
    } else {
      handleSignup();
    }
  };

  const PasswordStrength = (pwString) => {
    var strength = 0;

    strength += /[A-Z]+/.test(pwString) ? 1 : 0;
    strength += /[a-z]+/.test(pwString) ? 1 : 0;
    strength += /[0-9]+/.test(pwString) ? 1 : 0;
    strength += /[\W]+/.test(pwString) ? 1 : 0;

    switch (strength) {
      case 3:
        setStrength('Medium');
        break;
      case 4:
        setStrength('Strong');
        break;
      default:
        setStrength('Weak');
        break;
    }
  };

  const handleSignup = () => {
    setLoading(true);
    // navigation.navigate('MainStack');
    post(`${baseURL}/signup`, {
      customer_username: name,
      customer_phone_number: `+250${phone}`,
      customer_password: pwd,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.status == 400) {
          setError('Account already exist! Please user a different phone number!');
        } else {
          navigation.navigate('Location', { phone });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white }}>
      {error && (
        <ToastMessage
          label={error}
          style={{ backgroundColor: colors.danger }}
          onPress={() => setError(null)}
        />
      )}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
          zIndex: 2,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontSize: 18 }]}>Profile</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={80}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            keyboardShouldPersistTaps="always">
            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Full Names</Text>
              <View style={styled.inputField}>
                <TextInput
                  style={styled.textInput}
                  placeholder="Full Names"
                  onChangeText={(e) => setName(e)}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Phone Number</Text>
              <View style={styled.inputField}>
                <Text style={[styled.label, { color: colors.textDark, marginRight: 10 }]}>
                  +250
                </Text>
                <TextInput
                  style={styled.textInput}
                  keyboardType="phone-pad"
                  maxLength={9}
                  placeholder="Phone"
                  onChangeText={(e) => setPhone(e)}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Password</Text>
              <View style={styled.inputField}>
                <TextInput
                  style={styled.textInput}
                  secureTextEntry={hidePwd}
                  placeholder="Password"
                  onChangeText={(e) => {
                    PasswordStrength(e);
                    setPwd(e);
                  }}
                />
                <TouchableOpacity onPress={() => setHidePwd(!hidePwd)}>
                  <Feather name={hidePwd ? 'eye-off' : 'eye'} size={16} color={colors.iconDark} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: pwd == '' ? 0 : 1,
                }}>
                <View
                  style={{
                    height: 5,
                    width: 30,
                    backgroundColor:
                      strength == 'Weak'
                        ? 'red'
                        : strength == 'Medium'
                        ? 'orange'
                        : strength == 'Strong'
                        ? 'green'
                        : 'transparent',
                    borderRadius: 5,
                  }}
                />
                <Text style={{ fontFamily: fonts.medium, fontSize: 10, marginLeft: 10 }}>
                  {strength}
                </Text>
              </View>
            </View>

            <View style={{ height: 180, justifyContent: 'space-between' }}>
              <AppButton
                label="update profile"
                onPress={
                  name == '' || phone == '' || pwd == '' || loading ? () => {} : () => verify(phone)
                }
                style={{
                  backgroundColor:
                    name == '' || phone == '' || pwd == '' ? colors.textGrey : colors.primary,
                }}
                loading={loading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

export default Profile;
