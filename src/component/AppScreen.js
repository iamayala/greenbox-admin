import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
});

const AppScreen = ({ children, style }) => (
  <SafeAreaView style={[styles.container, style]}>
    <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
    <View style={{ flex: 1, marginTop: 0 }}>{children}</View>
  </SafeAreaView>
);

export default AppScreen;
