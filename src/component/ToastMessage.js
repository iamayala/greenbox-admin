import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styled from '../style/styles';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    position: 'absolute',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    margin: 20,
    flexDirection: 'row',
    zIndex: 2,
  },
  label: {
    fontFamily: fonts.regular,
    flex: 1,
    marginRight: 5,
    color: colors.white,
  },
});

const ToastMessage = ({ style, onPress, label }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={onPress}>
        <Feather name="x" size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ToastMessage;
