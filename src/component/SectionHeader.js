import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from '../style/styles';

const SectionHeader = ({ onPress, title, link }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={styled.sectionHeader}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styled.link}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;
