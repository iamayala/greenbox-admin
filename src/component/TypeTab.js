import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import styled from '../style/styles';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  tab: {
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 15,
    // borderWidth: 1,
    borderColor: colors.borderGrey,
    marginHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.textDark,
    fontFamily: fonts.medium,
    textTransform: 'capitalize',
  },
});

const TypeTab = ({ item, onPress, style, selected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tab,
        style,
        {
          backgroundColor: selected ? colors.primary : 'transparent',
          borderWidth: selected ? 0 : 1,
        },
      ]}>
      <Text style={[styles.text, { color: selected ? colors.white : colors.textDark }]}>
        {item.type_name}
      </Text>
    </TouchableOpacity>
  );
};

export default TypeTab;
