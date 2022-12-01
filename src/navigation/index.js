import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigation } from './tabs';
import { AuthenticationStackScreen } from './stack';

const NavigationStack = createStackNavigator();

export const MainNavigation = ({ navigation }) => {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator
        initialRouteName="AuthenticationStackScreen"
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <NavigationStack.Screen name="AuthenticationStack" component={AuthenticationStackScreen} />
        <NavigationStack.Screen name="MainStack" component={MainTabNavigation} />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};
