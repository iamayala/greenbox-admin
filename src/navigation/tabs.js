import 'react-native-gesture-handler';

import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, Image } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AccountStackScreen,
  CartStackScreen,
  FavStackScreen,
  FeedbackStackScreen,
  HomeStackScreen,
  MenuStackScreen,
  NotificationStackScreen,
  SearchStackScreen,
} from './stack';
import { Feather } from '@expo/vector-icons';
import colors from '../constants/colors';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { getLocalData, storeLocalData } from '../utils/Helpers';
import { emojis } from '../constants/utils';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#fff',
    height: Platform.OS == 'ios' ? 90 : 80,
    position: 'absolute',
    borderTopColor: 'transparent',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 0,
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const MainTabNavigation = ({ navigation, route }) => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (routeName == 'AccountStackScreen') {
      setNotification(false);
    }
  }, []);

  const addNotification = (value) => {
    storeLocalData('@NOTIFICATION', value).then(() => {
      // console.log('saved');
      // console.log(value);
      setNotification(value);
    });
  };

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      // addNotification(true);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      navigation.navigate('AccountStackScreen');
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeNavigation"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeNavigation"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="home" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="MenuStackScreen"
        component={MenuStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather
                name="book-open"
                size={24}
                color={focused ? colors.primary : colors.textGrey}
              />
            </View>
          ),
        }}
      />

      {/* 
      
      <Tab.Screen
        name="FeedbackStackScreen"
        component={FeedbackStackScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="star" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName == 'Checkout') {
              return { display: 'none' };
            }
            return styles.tabBarStyle;
          })(route),
        })}
      /> 
      
      */}

      <Tab.Screen
        name="NotificationStackScreen"
        component={NotificationStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="bell" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AccountStackScreen"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="user" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
