import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  tab: {
    backgroundColor: colors.primary,
    height: 45,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});

function MenuTab({ active, onPress, item }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, { backgroundColor: active ? colors.primary : colors.borderGrey }]}>
      <Image source={{ uri: item.type_emoji }} style={{ height: 20, width: 20, marginRight: 10 }} />
      <Text
        style={[
          styles.name,
          {
            fontSize: 15,
            color: active ? colors.white : colors.textDark,
            textTransform: 'capitalize',
          },
        ]}>
        {item.type_name}
      </Text>
    </TouchableOpacity>
  );
}

export default MenuTab;
