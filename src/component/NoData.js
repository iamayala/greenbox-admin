// https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/eyes_1f440.png

import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { height, width } from '../constants/dimensions';
import fonts from '../constants/fonts';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    flex: 1,
    justifyContent: 'center',
    height: height * 0.6,
  },
  text: {
    fontFamily: fonts.medium,
    textTransform: 'capitalize',
    fontSize: 16,
    marginTop: 10,
    color: colors.textGrey,
  },
});

const NoData = ({ label, style, emoji }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{
          uri: emoji,
        }}
        style={{
          width: 45.11,
          height: 45.11,
          borderRadius: 17,
        }}
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default NoData;
