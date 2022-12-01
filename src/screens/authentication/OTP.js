import React from 'react';
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
import CircleButton from '../../component/CircleButton';

function OTP({ navigation }) {
  const handleVerifyOTP = () => {
    navigation.navigate('Location');
  };
  return (
    <AppScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={80}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            keyboardShouldPersistTaps="always">
            <TouchableOpacity style={{ height: 50, justifyContent: 'center' }}>
              <Feather name="arrow-left" size={24} color={colors.iconDark} />
            </TouchableOpacity>
            <View style={{ height: 20 }} />
            <Text style={styled.header}>Submit OTP</Text>
            <Text style={[styled.subheader, { marginBottom: 25 }]}>
              Enter the code sent to 0789999999
            </Text>

            <View style={{ marginVertical: 10 }}>
              <View style={styled.inputField}>
                <TextInput
                  style={[
                    styled.textInput,
                    { textAlign: 'center', letterSpacing: 10, fontSize: 22 },
                  ]}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="----"
                  autoFocus
                />
              </View>
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 15,
              }}>
              <TouchableOpacity>
                <Text style={{ fontFamily: fonts.medium, color: colors.textGrey, fontSize: 16 }}>
                  Resend Code
                </Text>
              </TouchableOpacity>

              <CircleButton onPress={() => handleVerifyOTP()} label="OTP" />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

export default OTP;
