import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppScreen from '../../component/AppScreen';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { getLocalData } from '../../utils/Helpers';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  signature: {
    fontFamily: fonts.medium,
    color: colors.white,
  },
});

function Splash({ navigation }) {
  useEffect(() => {
    getLocalData('@ADMINDATA').then((res) => {
      console.log(res);
      if (res.length > 0) {
        navigation.navigate('MainStack');
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
    <AppScreen
      style={{
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ height: 100, width: 100, resizeMode: 'contain' }}
        />
        <Text
          style={{ marginTop: 20, fontFamily: fonts.medium, fontSize: 35, color: colors.white }}>
          GreenBox
        </Text>
        <View
          style={{ position: 'absolute', bottom: 40, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.signature}>Made with </Text>
          <AntDesign name="heart" size={13} color={colors.danger} />
          {/* <Text style={styles.signature}> by Serge. M</Text> */}
        </View>
      </View>
    </AppScreen>
  );
}

export default Splash;
