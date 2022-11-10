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
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.textDark,
    fontSize: 16,
    flexDirection: 'row',
    // flex: 1,
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
  iconView: {
    backgroundColor: colors.lightGreen,
    height: 35,
    width: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Tracker = ({ time, header, subheader, active }) => {
  return (
    <View style={[styles.container, { display: active ? 'flex' : 'none' }]}>
      <View
        style={[
          styles.iconView,
          { backgroundColor: active ? colors.lightGreen : colors.iconGrey },
        ]}>
        <Feather name="check" size={18} color={active ? colors.primary : colors.white} />
      </View>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.text, { flex: 1 }]}>{header}</Text>
          <Text
            style={[
              styles.text,
              { color: colors.textGrey, fontSize: 13, textTransform: 'none', textAlign: 'right' },
            ]}>
            {time}
          </Text>
        </View>
        <Text
          style={[styles.text, { color: colors.textGrey, fontSize: 13, textTransform: 'none' }]}>
          {subheader}
        </Text>
      </View>
    </View>
  );
};

export default Tracker;
