import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import ToastMessage from '../../component/ToastMessage';
import OrderCard from '../../component/OrderCard';
import { emojis } from '../../constants/utils';
import NoData from '../../component/NoData';
import { baseURL, get } from '../../utils/Api';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
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
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  subname: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textGrey,
  },
  tab: {
    backgroundColor: colors.primary,
    height: 45,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

class Tab extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.tab,
          { backgroundColor: this.props.active ? colors.primary : colors.borderGrey },
        ]}>
        <Text
          style={[
            styles.name,
            { fontSize: 15, color: this.props.active ? colors.white : colors.textDark },
          ]}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      orders: [],
      tab: 1,
      customer_id: null,
      loading: false,
    };
  }

  componentDidMount() {
    const { customer_id } = this.props.route.params;
    this.setState({ customer_id });
    this.handleFetchOrders(customer_id);
  }

  handleFetchOrders = (customer_id) => {
    get(`${baseURL}/order/${customer_id}`)
      .then((res) => {
        var result = res.data.data;
        for (const i in result) {
          result[i] = { ...result[i], basket: JSON.parse(result[i].basket) };
        }
        this.setState({ orders: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { message, tab, orders } = this.state;
    const { navigation } = this.props;

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
          <Text style={[styles.text, { fontSize: 18 }]}>Orders</Text>
          <TouchableOpacity style={styles.topBtn}>
            <Feather name="more-vertical" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginBottom: 10,
          }}>
          <Tab label="Active" active={tab == 1} onPress={() => this.setState({ tab: 1 })} />
          <Tab label="Completed" active={tab == 2} onPress={() => this.setState({ tab: 2 })} />
          <Tab label="Cancelled" active={tab == 3} onPress={() => this.setState({ tab: 3 })} />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <FlatList
            refreshing={this.state.loading}
            onRefresh={() => this.handleFetchOrders(this.state.customer_id)}
            data={
              tab == 1
                ? orders.filter((item) => item.order_status == 1 || item.order_status == 2)
                : tab == 2
                ? orders.filter((item) => item.order_status == 3)
                : tab == 3
                ? orders.filter((item) => item.order_status == 4)
                : null
            }
            renderItem={({ item }) => {
              return (
                <OrderCard
                  emoji={
                    tab == 1
                      ? emojis.orderActive
                      : tab == 2
                      ? emojis.orderComplete
                      : tab == 3
                      ? emojis.orderCancelled
                      : ''
                  }
                  item={item}
                  onPress={() => navigation.navigate('Track', { item })}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <NoData
                  emoji={emojis.hide}
                  label={
                    tab == 1
                      ? 'Oops! No active orders.'
                      : tab == 2
                      ? 'Oops! No completed orders.'
                      : tab == 3
                      ? 'Wow! No cancelled orders.'
                      : ''
                  }
                />
              );
            }}
          />
        </View>
      </AppScreen>
    );
  }
}

export default Orders;
