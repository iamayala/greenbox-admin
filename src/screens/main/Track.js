import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import AppButton from '../../component/AppButton';
import ToastMessage from '../../component/ToastMessage';
import { baseURL, get } from '../../utils/Api';
import Tracker from '../../component/Tracker';
import moment from 'moment';
import { height } from '../../constants/dimensions';

const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  topBtn: {
    height: 40.67,
    width: 40.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  subname: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textGrey,
  },
  containerx: {
    paddingVertical: 10,
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBtn: {
    height: 36.67,
    width: 36.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Track({ route, navigation }) {
  const [message, setMessage] = useState(null);
  const [item, setitem] = useState(route.params.item);
  const [order, setorder] = useState(null);

  useEffect(() => {
    get(`${baseURL}/order/id/${item.order_id}`).then((res) => {
      if (res.data.status == 200 && res.data.data[0]) {
        var result = res.data.data[0];
        setorder({ ...result, basket: JSON.parse(result.basket) });
      }
    });
  }, []);

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontSize: 18 }]}>Order #{item?.order_id}</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: height * 0.2 }}>
        <Text style={[styles.text, { marginHorizontal: 15, marginBottom: 5 }]}>Order Details</Text>
        {order?.basket.map((item, index) => {
          return (
            <View key={index} style={styles.containerx}>
              <Image
                source={{ uri: item.vegetable_image }}
                style={{
                  width: 59.11,
                  height: 59.11,
                  borderRadius: 13,
                }}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={[styles.text, { fontSize: 18 }]}>{item.vegetable_name}</Text>
                    <Text
                      style={[
                        styles.text,
                        { color: colors.textGrey, fontSize: 14, textTransform: 'capitalize' },
                      ]}>
                      {item.type_name}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[styles.text, { fontSize: 17, marginTop: 5, color: colors.danger }]}>
                      Qty: {item.quantity} {item.unit_short}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View>
          <Text style={[styles.text, { marginHorizontal: 15, marginBottom: 5, marginTop: 30 }]}>
            Delivery Instructions
          </Text>
          <Text
            style={[
              styles.text,
              {
                marginHorizontal: 20,
                marginBottom: 5,
                fontSize: 14,
                fontFamily: fonts.medium,
                color: colors.textGrey,
              },
            ]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non suscipit velit, at
            ultricies purus. Quisque maximus tempor dapibus. Duis nec tellus sapien. Nullam ultrices
            velit vitae urna pretium faucibus.
          </Text>
        </View>

        <Text style={[styles.text, { marginHorizontal: 15, marginBottom: 5, marginTop: 30 }]}>
          Order Status
        </Text>

        <Tracker
          header="Your order was placed"
          subheader="We are picking the best items to pack your order"
          active={order?.order_status == 1 ? true : false}
          time={order?.placed_on && moment(order?.placed_on).fromNow()}
        />
        <Tracker
          header="Order packed"
          subheader="We are currently packing your order on our fleet. We should take off soon."
          active={order?.order_status == 2 ? true : false}
          time={order?.completed_on && moment(order?.completed_on).fromNow()}
        />
        <Tracker
          header="Driver on the way"
          subheader="Our driver is on his maximum speed to delivery your order, please be patient."
          active={order?.order_status == 3 ? true : false}
          time={order?.completed_on && moment(order?.completed_on).fromNow()}
        />
        <Tracker
          header="Driver reached destination"
          subheader="Knock Knock! our driver is at the specified location, please receive your order."
          active={order?.order_status == 4 ? true : false}
          time={order?.completed_on && moment(order?.completed_on).fromNow()}
        />
        <Tracker
          header="Order Completed"
          subheader="Thank you for using GreenBox, please remember to rate the service. Enjoy!"
          time={order?.completed_on && moment(order?.completed_on).fromNow()}
          active={order?.order_status == 5 ? true : false}
        />

        <View style={{ flexDirection: 'row', marginHorizontal: 13 }}>
          {order?.order_status < 3 && (
            <AppButton
              label="Cancel Order"
              style={{ marginHorizontal: 7, flex: 1, backgroundColor: colors.danger }}
            />
          )}
          {order?.order_status < 5 && (
            <AppButton label="Accept Order" style={{ flex: 1, marginHorizontal: 7 }} />
          )}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

export default Track;
