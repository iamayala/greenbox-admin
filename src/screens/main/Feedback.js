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

function Feedback({ route, navigation }) {
  const [message, setMessage] = useState(null);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    handleGet;
  }, []);

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
        <Text style={[styles.text, { fontSize: 18 }]}>Feedback</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <FlatList
          data={location}
          renderItem={({ item }) => {
            return <NotificationItem />;
          }}
          ListEmptyComponent={() => {
            return (
              <NoData
                style={{ selfAlign: 'center' }}
                label="Oops! you don't have any feedback!"
                emoji={emojis.noNotifications}
              />
            );
          }}
        />
      </View>
    </AppScreen>
  );
}

export default Feedback;
