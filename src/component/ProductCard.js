import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import styled from '../style/styles';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  card: {
    height: 238.51,
    width: 173.32,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    marginHorizontal: 7,
  },
  header: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.medium,
  },
  subHeader: {
    fonts: 14,
    color: colors.textGrey,
    fontFamily: fonts.regular,
  },
  button: {
    height: 33.67,
    width: 33.67,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.textDark,
    flex: 1,
  },
});

const ProductCard = ({ item, onPress, style, checked }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image
        source={{
          uri: item.vegetable_image,
        }}
        style={{ height: 140, width: '100%', borderTopLeftRadius: 14, borderTopRightRadius: 14 }}
      />
      <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text numberOfLines={1} style={styles.header}>
            {item?.vegetable_name}
          </Text>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 10,
              backgroundColor:
                item.vegetable_status == 1
                  ? colors.primary
                  : item.vegetable_status == 0
                  ? colors.warning
                  : item.vegetable_status == 9
                  ? colors.danger
                  : colors.iconGrey,
              marginLeft: 5,
            }}
          />
        </View>
        <Text numberOfLines={1} style={styles.subHeader}>
          1 {item?.unit_short}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 45.67,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.price}>RWF {item?.price}</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.lightGreen }]}>
            <Feather name="edit-2" size={17} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
