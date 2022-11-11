import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import fonts from '../constants/fonts';
import colors from '../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    height: 45,
    marginHorizontal: 15,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.textDark,
    fontSize: 15,
    flexDirection: 'row',
    flex: 1,
    textTransform: 'capitalize',
  },
  badge: {
    backgroundColor: colors.danger,
    height: 23.41,
    width: 23.41,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  badgeNo: {
    fontFamily: fonts.medium,
    color: colors.white,
    fontSize: 10,
  },
});

export const Action = ({ label, onPress, style, active, loading }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
      {active && <Feather name="check" size={18} color={colors.primary} />}
      {loading && <ActivityIndicator size="small" color={colors.primary} />}
    </TouchableOpacity>
  );
};

export default Action;
