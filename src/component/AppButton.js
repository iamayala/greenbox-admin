import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 55,
    borderRadius: 14,
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

const AppButton = ({ onPress, label, style, loading = false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
