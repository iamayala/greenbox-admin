import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import ToastMessage from '../../component/ToastMessage';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  topBtn: {
    height: 40.67,
    width: 40.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  subname: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textGrey,
  },
});

function Analytics({ route, navigation }) {
  const [message, setMessage] = useState(null);

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontSize: 18 }]}>Analytics</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10 }}></View>
    </AppScreen>
  );
}

export default Analytics;
