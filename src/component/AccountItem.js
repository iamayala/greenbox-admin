import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import fonts from '../constants/fonts';
import colors from '../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    height: 60,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.textDark,
    fontSize: 16,
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 20,
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

export const AccountItem = ({ icon, label, onPress, style, badge }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Feather name={icon} size={20} color={colors.iconDark} />
      <Text style={styles.text}>{label}</Text>
      {badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeNo}>{badge}</Text>
        </View>
      )}
      <Feather name="chevron-right" size={18} color={colors.iconDark} />
    </TouchableOpacity>
  );
};

export default AccountItem;
