import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { width } from '../constants/dimensions';
import fonts from '../constants/fonts';

const styles = StyleSheet.create({
  container: {
    height: 109.11,
    width: width / 2 - 20,
    borderRadius: 18,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: '#B2E4C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  text: {
    fontFamily: fonts.medium,
    textTransform: 'capitalize',
    fontSize: 16,
    marginTop: 10,
  },
});

const CategoryCard = ({ item, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={{ uri: item.type_emoji }} style={{ height: 35, width: 35 }} />
      <Text style={styles.text}>{item.type_name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
