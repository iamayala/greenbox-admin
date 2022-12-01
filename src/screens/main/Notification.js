import React, { useState, useEffect } from 'react';
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
import AppButton from '../../component/AppButton';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import ProductCard from '../../component/ProductCard';
import AddressItem from '../../component/AddressItem';
import NotificationItem from '../../component/NotificationItem';
import NoData from '../../component/NoData';
import { emojis } from '../../constants/utils';
import Tab from '../../component/Tab';

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
});

function Notification({ route, navigation }) {
  const [message, setMessage] = useState(null);
  const [tab, settab] = useState(1);
  const [location, setLocation] = useState([]);
  const [loading, setloading] = useState(false);

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}>
        <Text style={[styles.text, { fontSize: 18 }]}>Notifications</Text>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
        <Tab label="All" active={tab == 1} onPress={() => settab(1)} />
        <Tab label="Orders" active={tab == 2} onPress={() => settab(2)} />
        <Tab label="Feedbacks" active={tab == 3} onPress={() => settab(3)} />
        <Tab label="Updates" active={tab == 4} onPress={() => settab(4)} />
      </View>
      <View style={{ marginBottom: 10, flex: 1 }}>
        <FlatList
          refreshing={loading}
          onRefresh={() => {}}
          data={location}
          renderItem={({ item }) => {
            return <NotificationItem />;
          }}
          ListEmptyComponent={() => {
            return (
              <NoData
                style={{ selfAlign: 'center' }}
                label="Oops! you don't have any notifications!"
                emoji={emojis.noNotifications}
              />
            );
          }}
        />
      </View>
    </AppScreen>
  );
}

export default Notification;
