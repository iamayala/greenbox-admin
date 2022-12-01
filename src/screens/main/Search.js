import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppScreen from '../../component/AppScreen';
import CategoryCard from '../../component/CategoryCard';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { baseURL, get } from '../../utils/Api';
import NoData from '../../component/NoData';
import { emojis } from '../../constants/utils';
import ProductCard from '../../component/ProductCard';
import { height, width } from '../../constants/dimensions';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  searchcontainer: {
    height: 51.57,
    backgroundColor: colors.backgroundGrey,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  TextInput: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginLeft: 15,
    flex: 1,
  },
});

function Search({ navigation }) {
  const [category, setCategory] = useState([]);
  const [products, setproducts] = useState(null);
  const [results, setresults] = useState(null);
  const [loading, setloading] = useState(false);
  const [query, setquery] = useState('');

  useEffect(() => {
    handleFetchTypes();
    handleFetchProducts();
  }, []);

  // fetch categories
  const handleFetchTypes = () => {
    get(`${baseURL}/vegetabletype`)
      .then((res) => {
        if (res.status == 200) {
          setCategory(res.data.data);
        }
      })
      .catch((err) => {
        setError('Something went wrong!');
      });
  };

  // handle fetch products
  const handleFetchProducts = () => {
    get(`${baseURL}/vegetable`).then((res) => {
      if (res.status == 200) {
        setproducts(res.data.data);
      }
    });
  };

  const handleSearch = (text) => {
    const res = products.filter((item) =>
      item.vegetable_name.toLowerCase().includes(text.toLowerCase())
    );
    setresults(res);
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.text, { fontSize: 18 }]}>Search</Text>
      </View>

      <View style={styles.searchcontainer}>
        <Feather name="search" size={24} color={colors.iconGrey} />
        <TextInput
          placeholder="Search..."
          style={styles.TextInput}
          value={query}
          onChangeText={(e) => {
            handleSearch(e);
            setsearching(true);
            setquery(e);
          }}
        />
        {query != '' && (
          <TouchableOpacity
            onPress={() => {
              setsearching(false);
              setquery('');
            }}>
            <Feather name="x" size={18} color={colors.iconGrey} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {query == '' ? (
          <FlatList
            data={category}
            refreshing={loading}
            onRefresh={() => handleFetchTypes()}
            horizontal={false}
            numColumns={2}
            style={{ paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <CategoryCard item={item} onPress={() => navigation.navigate('More', { item })} />
              );
            }}
            ListEmptyComponent={() => {
              return <NoData emoji={emojis.hide} />;
            }}
          />
        ) : (
          <FlatList
            data={results}
            numColumns={2}
            horizontal={false}
            style={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => {
              return (
                <ProductCard
                  item={item}
                  style={{
                    marginBottom: 10,
                    width: width * 0.5 - 25,
                  }}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <NoData
                  label="No results found!"
                  emoji={emojis.hide}
                  style={{ height: height * 0.3 }}
                />
              );
            }}
          />
        )}
      </TouchableWithoutFeedback>
    </AppScreen>
  );
}

export default Search;
