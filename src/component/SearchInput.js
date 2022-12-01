import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styled from '../style/styles';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const styles = StyleSheet.create({
  container: {
    height: 51.57,
    backgroundColor: colors.backgroundGrey,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  TextInput: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginLeft: 15,
    flex: 1,
  },
});

function SearchInput() {
  return (
    <View style={styles.container}>
      <Feather name="search" size={24} color={colors.iconGrey} />
      <TextInput placeholder="Search..." style={styles.TextInput} />
    </View>
  );
}

export default SearchInput;
