import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import ToastMessage from '../../component/ToastMessage';
import ProductCard from '../../component/ProductCard';
import { baseURL, get } from '../../utils/Api';
import { width } from '../../constants/dimensions';
import NoData from '../../component/NoData';
import { emojis } from '../../constants/utils';
import MenuTab from '../../component/MenuTab';

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
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  xxcontainer: {
    height: 44.57,
    backgroundColor: colors.backgroundGrey,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 13,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  xxTextInput: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginLeft: 15,
    flex: 1,
  },
});

const type_all = {
  type_emoji: emojis.confetti,
  type_name: 'all',
  vegetable_type_id: null,
};

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      message: null,
      type: [],
      active: type_all,
      loading: true,
      error: null,
      all: type_all,
      searching: false,
      query: '',
      results: [],
    };
  }

  componentDidMount() {
    this.handleFetchTypes();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.handleFetchTypes();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleFetchProducts = () => {
    get(`${baseURL}/vegetable`)
      .then((res) => {
        if (res.data.status == 200) {
          this.setState({ product: res.data.data, loading: false });
        }
      })
      .catch(() => {
        this.setState({ error: 'Something went wrong!' });
      });
  };

  handleFetchTypes = () => {
    get(`${baseURL}/vegetabletype`)
      .then((res) => {
        if (res.data.status == 200) {
          var types = [this.state.all];
          var results = types.concat(res.data.data);
          this.setState({ type: results });
          this.handleFetchProducts();
        }
      })
      .catch((err) => {
        this.setState({ error: 'Something went wrong!' });
      });
  };

  handleSearch = (text) => {
    const res = this.state.product.filter((item) =>
      item.vegetable_name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ results: res });
  };

  render() {
    const { message, searching, type, active, query, product, loading, results } = this.state;
    const { navigation } = this.props;

    return (
      <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
        {message && (
          <ToastMessage label={message} onPress={() => this.setState({ message: null })} />
        )}
        <View
          style={{
            height: 65,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 25,
            backgroundColor: colors.white,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ searching: true, active: type_all });
            }}
            style={[
              styles.topBtn,
              { backgroundColor: colors.backgroundGrey, height: 35, width: 35, borderRadius: 10 },
            ]}>
            <Feather name="search" size={18} color={colors.iconGrey} />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 18, textTransform: 'capitalize' }]}>Menu</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('New', { item: undefined })}
            style={[
              styles.topBtn,
              { backgroundColor: colors.primary, height: 35, width: 35, borderRadius: 10 },
            ]}>
            <Feather name="plus" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
        {searching ? (
          <View style={{ height: 55 }}>
            <View style={styles.xxcontainer}>
              <Feather name="search" size={24} color={colors.iconGrey} />
              <TextInput
                placeholder="Search..."
                style={styles.xxTextInput}
                value={query}
                onChangeText={(e) => {
                  this.handleSearch(e);
                  this.setState({ query: e });
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({ searching: false, query: '' });
                }}>
                <Feather name="x" size={20} color={colors.iconGrey} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ height: 55 }}>
            <FlatList
              data={type}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
              renderItem={({ item }) => {
                return (
                  <MenuTab
                    active={item.vegetable_type_id == active?.vegetable_type_id}
                    onPress={() => this.setState({ active: item })}
                    item={item}
                  />
                );
              }}
            />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <FlatList
            data={
              active?.type_name !== 'all'
                ? product.filter((item) => item.vegetable_type_id == active?.vegetable_type_id)
                : query !== ''
                ? results
                : product
            }
            keyboardShouldPersistTaps="always"
            numColumns={2}
            refreshing={loading}
            onRefresh={() => this.handleFetchTypes()}
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
                  onPress={() => {
                    this.setState({ searching: false, query: '' });
                    navigation.navigate('New', { item });
                  }}
                />
              );
            }}
            ListEmptyComponent={() => {
              return <NoData emoji={emojis.hide} label="Oops! Category is empty" />;
            }}
          />
        </View>
      </AppScreen>
    );
  }
}

export default Menu;
