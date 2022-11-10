import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import styled from '../../style/styles';
import fonts from '../../constants/fonts';
import AppButton from '../../component/AppButton';
import ToastMessage from '../../component/ToastMessage';
import { baseURL, get, post } from '../../utils/Api';
import Tracker from '../../component/Tracker';
import moment, { isMoment } from 'moment';
import { height } from '../../constants/dimensions';
import Modal from 'react-native-modal';
import { getLocalData } from '../../utils/Helpers';
import NoData from '../../component/NoData';
import { emojis } from '../../constants/utils';

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
  drivercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 20,
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

export class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      item: null,
      order: null,
      fetching: false,
      loading: false,
      drivers: [],
      activeDriver: null,
      showDrivers: false,
      updating: false,
      profile: null,
    };
  }

  componentDidMount() {
    const { item } = this.props.route.params;
    this.setState({ item });
    this.fetchProfile();
    this.fetchOrder(item);

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ item });
      this.fetchOrder(item);
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  fetchProfile = () => {
    getLocalData('@ADMINDATA').then((res) => {
      this.setState({ profile: res[0] });
    });
  };

  fetchOrder = (item) => {
    get(`${baseURL}/order/id/${item.order_id}`).then((res) => {
      if (res.data.status == 200 && res.data.data[0]) {
        var result = res.data.data[0];
        this.setState({ order: { ...result, basket: JSON.parse(result.basket) } });
        this.fetchActiveDriver(result?.delivery_by);
      }
    });
  };

  fetchActiveDriver = (driver) => {
    get(`${baseURL}/fetch/drivers`).then((res) => {
      if (res.status == 200) {
        var result = res.data.data;
        var activeDriver = [];
        if (driver) {
          activeDriver = result.filter((item) => item.admin_id == driver);
        }
        this.setState({ drivers: result, activeDriver: activeDriver[0] });
      }
    });
  };

  updateOrderStatus = (order_id, order_status) => {
    this.setState({ loading: true });
    post(`${baseURL}/order/status`, {
      order_id,
      order_status,
    })
      .then((res) => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ message: 'Something went wrong, please try again later!' });
        setTimeout(() => {
          this.setState({ message: null });
        }, 2000);
      });
  };

  // accepted_on, processed_by,

  acceptOrder = (order_id, order_status) => {
    this.setState({ loading: true });
    post(`${baseURL}/order/accept`, {
      order_id,
      order_status,
      processed_by: this.state.profile.admin_id,
      accepted_on: moment().format('YYYY-MM-DD  HH:mm:ss.000'),
    })
      .then((res) => {
        this.setState({ loading: false });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ message: 'Something went wrong, please try again later!' });
        setTimeout(() => {
          this.setState({ message: null });
        }, 2000);
      });
  };

  assignDriver = (item) => {
    this.setState({ updating: true });
    var data = {
      delivery_by: item.admin_id,
      assigned_on: moment().format('YYYY-MM-DD  HH:mm:ss.000'),
      order_id: this.state.order.order_id,
    };
    post(`${baseURL}/assign/driver`, data)
      .then((res) => {
        if (res.data.status == 200) {
          this.setState({ activeDriver: item, showDrivers: false, updating: false });
        }
      })
      .catch((err) => {
        this.setState({ message: 'Something went wrong. Please try again!' });
        setTimeout(() => {
          this.setState({ message: null });
        }, 2000);
      });
  };

  render() {
    const {
      message,
      showDrivers,
      loading,
      fetching,
      drivers,
      activeDriver,
      item,
      order,
      updating,
    } = this.state;
    const { navigation } = this.props;

    if (!order) {
      return <NoData label="fetching" emoji={emojis.tree} />;
    }
    return (
      <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
        {message && (
          <ToastMessage label={message} onPress={() => this.setState({ message: null })} />
        )}

        <Modal isVisible={showDrivers}>
          <View style={styled.modal}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={[styled.header, { fontSize: 18 }]}>Select Driver</Text>
              <TouchableOpacity
                onPress={updating ? () => {} : () => this.setState({ showDrivers: false })}
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: colors.backgroundGrey,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                }}>
                <Feather name="x" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {drivers?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={updating ? () => {} : () => this.assignDriver(item)}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 45,
                      borderBottomColor: colors.backgroundGrey,
                      borderBottomWidth: 1,
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontFamily: fonts.medium,
                          color: colors.textDark,
                          fontSize: 17,
                          textTransform: 'capitalize',
                          marginRight: 15,
                        }}>
                        {item.admin_name}
                      </Text>
                      {updating && <ActivityIndicator size="small" color={colors.primary} />}
                    </View>
                    {activeDriver == item && (
                      <Feather name="check" size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Modal>

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
        <ScrollView
          contentContainerStyle={{ paddingBottom: height * 0.2 }}
          refreshControl={
            <RefreshControl refreshing={fetching} onRefresh={() => this.fetchOrder(item)} />
          }>
          <Text style={[styles.text, { marginHorizontal: 15, marginBottom: 5 }]}>
            Order Details
          </Text>
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
                        Quantity: {item.quantity} {item.unit_short}
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
              {order?.instruction ? order?.instruction : `No instructions provided!`}
            </Text>
          </View>

          {order?.order_id !== 1 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 5,
                  marginHorizontal: 15,
                }}>
                <Text
                  style={[
                    styles.text,
                    { color: activeDriver ? colors.textDark : colors.textGrey },
                  ]}>
                  {activeDriver ? `Driver` : `No Driver`}
                </Text>
              </View>

              {activeDriver && (
                <View style={[styles.drivercontainer]}>
                  <View style={[styles.iconView, { backgroundColor: colors.primary }]}>
                    <Feather name="user" size={18} color={colors.white} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 20 }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.text, { flex: 1, textTransform: 'capitalize' }]}>
                        {activeDriver?.admin_name}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: colors.textGrey,
                            fontSize: 13,
                            textTransform: 'none',
                            textAlign: 'right',
                          },
                        ]}>
                        {activeDriver?.admin_status == 1 ? `Online` : `Offline`}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.text,
                        { color: colors.textGrey, fontSize: 13, textTransform: 'none' },
                      ]}>
                      {activeDriver?.admin_phone}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          <Text style={[styles.text, { marginHorizontal: 15, marginBottom: 5, marginTop: 30 }]}>
            Order Status
          </Text>

          <Tracker
            header="Your order was placed"
            subheader="We are picking the best items to pack your order"
            active={order?.order_status >= 1 ? true : false}
            time={order?.placed_on && moment(order?.placed_on).fromNow()}
          />
          <Tracker
            header="Order Accepted"
            subheader="We are currently packing your order on our fleet. We should take off soon."
            active={order?.order_status >= 2 ? true : false}
            time={moment(order?.accepted_on).fromNow()}
          />
          <Tracker
            header="Driver Assigned"
            subheader="Our driver is on his maximum speed to delivery your order, please be patient."
            active={order?.order_status >= 3 ? true : false}
            time={moment(order?.assigned_on).fromNow()}
          />
          <Tracker
            header="Driver reached destination"
            subheader="Knock Knock! our driver is at the specified location, please receive your order."
            active={order?.order_status >= 4 ? true : false}
            time={order?.completed_on && moment(order?.completed_on).fromNow()}
          />
          <Tracker
            header="Order Completed"
            subheader="Thank you for using GreenBox, please remember to rate the service. Enjoy!"
            time={order?.completed_on && moment(order?.completed_on).fromNow()}
            active={order?.order_status == 5 ? true : false}
          />

          {order?.order_status == 2 && (
            <AppButton
              label={activeDriver ? `Re-Assign Driver` : `Assign Driver`}
              style={{ marginHorizontal: 20, flex: 1, backgroundColor: colors.primary }}
              onPress={() => this.setState({ showDrivers: true })}
              loading={updating}
            />
          )}

          {order?.order_status == 1 && (
            <View style={{ flexDirection: 'row', marginHorizontal: 13 }}>
              {order?.order_status < 3 && (
                <AppButton
                  label="Cancel Order"
                  style={{ marginHorizontal: 7, flex: 1, backgroundColor: colors.danger }}
                  onPress={() => this.updateOrderStatus(order?.order_id, 9)}
                  loading={loading}
                />
              )}
              {order?.order_status < 5 && (
                <AppButton
                  label="Accept Order"
                  style={{ flex: 1, marginHorizontal: 7 }}
                  onPress={() => this.acceptOrder(order?.order_id, 2)}
                  loading={loading}
                />
              )}
            </View>
          )}
        </ScrollView>
      </AppScreen>
    );
  }
}

export default Track;
