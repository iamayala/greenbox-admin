// https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/eyes_1f440.png

import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { height, width } from '../constants/dimensions';
import fonts from '../constants/fonts';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    flex: 1,
    justifyContent: 'center',
    height: height * 0.6,
  },
  name: {
    fontFamily: fonts.medium,
    textTransform: 'capitalize',
    fontSize: 13,
    color: colors.textGrey,
    textAlign: 'center',
  },
  tab: {
    backgroundColor: colors.primary,
    height: 45,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});

const Tab = ({ active, onPress, label }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, { backgroundColor: active ? colors.primary : colors.borderGrey }]}>
      <Text
        style={[
          styles.name,
          {
            color: active ? colors.white : colors.textDark,
            textTransform: 'capitalize',
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;
