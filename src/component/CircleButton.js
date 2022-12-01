import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 55,
    width: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: colors.textWhite,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: fonts.medium,
    fontSize: 16,
  },
});

const CircleButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { style }]}>
      <Feather name="chevron-right" size={24} color={colors.textWhite} />
    </TouchableOpacity>
  );
};

export default CircleButton;
