import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import AccountItem from '../../component/AccountItem';
import AppButton from '../../component/AppButton';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { emojis } from '../../constants/utils';
import { baseURL, get, post } from '../../utils/Api';
import { clearLocalData, getLocalData, storeLocalData } from '../../utils/Helpers';
import Modal from 'react-native-modal';
import PromptModal from '../../component/PromptModal';

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
    borderColor: colors.backgroundGrey,
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    height: 60,
    // marginHorizontal: 20,
  },
});

function Account({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [logoutmodal, setlogoutmodal] = useState(false);
  const [loading, setloading] = useState(false);
  const [offline, setoffline] = useState(true);

  useEffect(() => {
    getLocalData('@ADMINDATA').then((res) => {
      setProfile(res[0]);
    });
    addNotification(false);
  }, []);

  const handleLogout = () => {
    setloading(true);
    clearLocalData().then(() => {
      setloading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthenticationStack' }],
      });
    });
  };

  const addNotification = (value) => {
    storeLocalData('@NOTIFICATION', value);
    // console.log(value);
  };

  const handleGoOffline = (data) => {
    const changes = { ...profile, offline: data };
    storeLocalData('@ADMINDATA', [changes])
      .then(() => {
        setoffline(data);
      })
      .catch((err) => {
        setError('Something went wrong! Please try again!');
      });
  };

  const handleGoOfflineDB = (data) => {
    post(`${baseURL}/admin/status`, {
      admin_name: profile.admin_name,
      admin_status: data ? 1 : 0,
    }).catch((err) => {
      console.info('Error => ' + err);
    });
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.text, { fontSize: 18 }]}>Account</Text>
      </View>
      <Modal isVisible={logoutmodal}>
        <PromptModal
          text="You are about to logout of your account. Please confirm this action."
          yes={() => {
            setlogoutmodal(false);
            handleLogout();
          }}
          no={() => setlogoutmodal(false)}
        />
      </Modal>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', marginBottom: 15 }}>
          <View
            style={{
              height: 70,
              width: 70,
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.lightGreen,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 17,
            }}>
            <Image
              source={{ uri: emojis.grape }}
              style={{
                height: 35,
                width: 35,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 15, flex: 1 }}>
            <Text style={[styles.text, { fontSize: 18, textTransform: 'capitalize' }]}>
              {profile?.admin_name}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  color: colors.textGrey,
                  fontFamily: fonts.regular,
                  textTransform: 'capitalize',
                },
              ]}>
              {profile?.admin_role}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={[styles.topBtn, { display: 'none' }]}>
            <Feather name="edit-2" size={18} color={colors.iconDark} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Feather name={offline ? 'unlock' : 'lock'} size={20} color={colors.iconDark} />
          <Text style={[styles.text, { fontSize: 16, flex: 1, marginLeft: 20 }]}>
            {offline ? `Close` : `Open`} Store
          </Text>
          <Switch
            trackColor={{ false: colors.backgroundGrey, true: colors.backgroundGrey }}
            thumbColor={offline ? colors.primary : colors.secondary}
            ios_backgroundColor={colors.backgroundGrey}
            onValueChange={() => {
              handleGoOfflineDB(!offline);
              handleGoOffline(!offline);
            }}
            value={offline}
          />
        </View>
        <AccountItem
          icon="bar-chart-2"
          label="analytics"
          onPress={() => navigation.navigate('Analytics')}
        />
        <AccountItem
          icon="credit-card"
          label="payments"
          onPress={() => navigation.navigate('Payment')}
        />
        <AccountItem
          icon="settings"
          label="settings"
          onPress={() => navigation.navigate('Settings', { profile })}
        />
        <AccountItem
          icon="help-circle"
          label="support"
          onPress={() => navigation.navigate('Help')}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: colors.backgroundGrey,
            borderBottomWidth: 1,
            height: 60,
          }}
          onPress={loading ? () => {} : () => setlogoutmodal(true)}>
          <Feather name="arrow-right-circle" size={20} color={colors.danger} />
          <Text
            style={[styles.text, { fontSize: 16, flex: 1, marginLeft: 20, color: colors.danger }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

export default Account;
