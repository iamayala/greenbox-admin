import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (storeName, value) => {
  try {
    await AsyncStorage.setItem(storeName, JSON.stringify(value));
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const getLocalData = async (storeName) => {
  try {
    const value = await AsyncStorage.getItem(storeName);
    return value != null ? JSON.parse(value) : [];
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const deleteLocalData = async (storeName, value) => {
  try {
    const val = await AsyncStorage.getItem(storeName);
    var array = val != null ? JSON.parse(val) : null;
    var newArray = array.filter((item) => item != value);
    await AsyncStorage.setItem(storeName, JSON.stringify(newArray));
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const removeLocalData = async (storeName) => {
  try {
    await AsyncStorage.removeItem(storeName);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const clearLocalData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};
