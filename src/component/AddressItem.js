import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { Feather } from '@expo/vector-icons';
import { emojis } from '../constants/utils';

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    marginHorizontal: 20,
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: fonts.medium,
    fontSize: 16,
  },
});

const AddressItem = ({ onPress, style, item }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { style }]}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 50,
          borderColor: colors.primary,
          borderWidth: 1.25,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 15,
        }}>
        <Image source={{ uri: emojis.home }} style={{ height: 20, width: 20 }} />
      </View>
      <View>
        <Text style={styles.text}>{item}</Text>
        {/* <Text style={[styles.text, { fontSize: 14, color: colors.textGrey }]}>Default Address</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default AddressItem;
