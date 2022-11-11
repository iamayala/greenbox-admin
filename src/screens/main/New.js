import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import styled from '../../style/styles';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import ToastMessage from '../../component/ToastMessage';
import { baseURL, get, post } from '../../utils/Api';
import { height, width } from '../../constants/dimensions';
import AppButton from '../../component/AppButton';
import Action from '../../component/Action';

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
    marginRight: 7,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});

function New({ route, navigation }) {
  const { item } = route.params;
  const [message, setMessage] = useState(null);
  const [type, settype] = useState([]);
  const [unit, setunit] = useState([]);
  const [error, seterror] = useState(null);
  const [selectedunit, setselectedunit] = useState(null);
  const [selectedtype, setselectedtype] = useState(item?.vegetable_type_id);
  const [selectedprice, setselectedprice] = useState(item?.price);
  const [uploading, setuploading] = useState(false);
  const [description, setdescription] = useState(item?.description);
  const [name, setname] = useState(item?.vegetable_name);
  const [updating, setupdating] = useState(false);
  const [showActions, setshowActions] = useState(false);

  useEffect(() => {
    handleFetchTypes();
    handleFetchUnits();
  }, []);

  const handleFetchTypes = () => {
    get(`${baseURL}/vegetabletype`)
      .then((res) => {
        if (res.data.status == 200) {
          settype(res.data.data);
          setselectedunit(item?.vegetable_unit_id);
          //    setloading(false);
        }
      })
      .catch((err) => {
        seterror('Something went wrong!');
      });
  };

  const handleFetchUnits = () => {
    get(`${baseURL}/unit`)
      .then((res) => {
        if (res.data.status == 200) {
          setunit(res.data.data);
        }
      })
      .catch((err) => {
        seterror('Something went wrong!');
      });
  };

  const handleUploadVegetable = () => {
    setuploading(true);
    var data = {
      vegetable_name: name,
      price: selectedprice,
      vegetable_type_id: selectedtype.vegetable_type_id,
      vegetable_unit_id: selectedunit.vegetable_unit_id,
      vegetable_image:
        'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxfHxCUk9DQ09MSXxlbnwwfHx8fDE2NDg2NDMyMDI&ixlib=rb-1.2.1&q=80&w=1080',
      description: description,
      vegetable_status: 1,
    };
    post(`${baseURL}/vegetable`, data).then((res) => {
      if (res.data.status == 200) {
        setMessage('Product added succesfully!');
      }
      setuploading(false);
      setname('');
      setdescription('');
      setselectedprice('');
      setselectedunit(null);
      setselectedtype(null);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  };

  const handleUpdateVegetable = () => {
    setuploading(true);
    var data = {
      vegetable_name: name,
      price: selectedprice,
      vegetable_type_id: selectedtype.vegetable_type_id,
      vegetable_unit_id: selectedunit.vegetable_unit_id,
      vegetable_image:
        'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxfHxCUk9DQ09MSXxlbnwwfHx8fDE2NDg2NDMyMDI&ixlib=rb-1.2.1&q=80&w=1080',
      description: description,
      vegetable_id: item.vegetable_id,
    };
    post(`${baseURL}/update/vegetable`, data).then((res) => {
      if (res.data.status == 200) {
        setMessage('Product updated succesfully!');
      }
      setuploading(false);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  };

  const handleUpdateStatus = (status) => {
    setupdating(true);
    var data = {
      vegetable_status: status,
      vegetable_id: item.vegetable_id,
    };
    post(`${baseURL}/update/vegetable/status`, data).then((res) => {
      setshowActions(false);
      switch (res.data.status) {
        case 200:
          setMessage('Product updated succesfully!');
          break;
        case 404:
          setMessage('Product updated changed!');
          break;
        case 400:
          setMessage('Something went wrong, please try again later!');
          break;
      }
      setupdating(false);
      setTimeout(() => {
        setMessage(null);
        navigation.goBack();
      }, 2000);
    });
  };

  const Tag = ({ active, onPress, item }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.tab, { backgroundColor: active ? colors.primary : colors.borderGrey }]}>
        <Image
          source={{ uri: item.type_emoji }}
          style={{ height: 20, width: 20, marginRight: 10 }}
        />
        <Text
          style={[
            styles.name,
            {
              fontSize: 15,
              color: active ? colors.white : colors.textDark,
              textTransform: 'capitalize',
            },
          ]}>
          {item.type_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const Unit = ({ active, onPress, item }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.tab, { backgroundColor: active ? colors.primary : colors.borderGrey }]}>
        <Text
          style={[
            styles.name,
            {
              fontSize: 15,
              color: active ? colors.white : colors.textDark,
              textTransform: 'capitalize',
            },
          ]}>
          {item.unit_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
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
        <Text style={[styles.text, { fontSize: 18 }]}>
          {item ? `Edit Item` : `Create New Item`}
        </Text>
        <TouchableOpacity style={styles.topBtn} onPress={() => setshowActions(!showActions)}>
          <Feather name="more-vertical" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
      </View>
      {showActions && (
        <View
          style={{
            backgroundColor: colors.backgroundGrey,
            width: width * 0.7,
            position: 'absolute',
            zIndex: 2,
            top: 50,
            right: 25,
          }}>
          <Action
            label="Available"
            active={item?.vegetable_status == 1 && true}
            onPress={updating ? () => {} : () => handleUpdateStatus(1)}
            loading={updating}
          />
          <Action
            label="not available today"
            active={item?.vegetable_status == 0 && true}
            onPress={updating ? () => {} : () => handleUpdateStatus(0)}
            loading={updating}
          />
          <Action
            label="not available indefinitely"
            active={item?.vegetable_status == 9 && true}
            onPress={updating ? () => {} : () => handleUpdateStatus(9)}
            loading={updating}
          />
        </View>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 25 }}>
          <View style={{ marginVertical: 10 }}>
            <Text style={styled.label}>Product Name</Text>
            <View style={styled.inputField}>
              <TextInput
                style={styled.textInput}
                keyboardType="default"
                value={name}
                placeholder="Add display name..."
                onChangeText={(e) => setname(e)}
              />
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styled.label}>Description</Text>
            <View style={[styled.inputField, { height: 120 }]}>
              <TextInput
                style={[styled.textInput, { height: 80 }]}
                textAlignVertical="top"
                multiline
                value={description}
                keyboardType="default"
                placeholder="Add a small description..."
                onChangeText={(e) => setdescription(e)}
              />
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styled.label}>Price</Text>
            <View style={styled.inputField}>
              <Text style={[styled.normalText, { marginRight: 10 }]}>RWF</Text>
              <TextInput
                style={styled.textInput}
                keyboardType="numeric"
                maxLength={6}
                value={selectedprice}
                placeholder="0000"
                onChangeText={(e) => setselectedprice(e)}
              />
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styled.label}>Select Unit</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
              {unit.map((item, index) => {
                return (
                  <Unit
                    key={index}
                    item={item}
                    onPress={() => setselectedunit(item)}
                    active={selectedunit?.vegetable_unit_id == item.vegetable_unit_id}
                  />
                );
              })}
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styled.label}>Select Type</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
              {type.map((item, index) => {
                return (
                  <Tag
                    key={index}
                    item={item}
                    onPress={() => setselectedtype(item)}
                    active={selectedtype?.vegetable_type_id == item.vegetable_type_id}
                  />
                );
              })}
            </View>
          </View>

          <View style={{ marginVertical: 10, display: 'none' }}>
            <Text style={styled.label}>Upload Image</Text>
          </View>

          <AppButton
            label={item ? `Edit Product` : `Post Product`}
            onPress={
              uploading ||
              name == '' ||
              description == '' ||
              selectedprice == '' ||
              selectedtype == null ||
              selectedunit == null
                ? () => {}
                : item
                ? () => handleUpdateVegetable()
                : () => handleUploadVegetable()
            }
            loading={uploading}
            style={{
              marginTop: 20,
              backgroundColor:
                uploading ||
                name == '' ||
                description == '' ||
                selectedprice == '' ||
                selectedtype == null ||
                selectedunit == null
                  ? colors.iconGrey
                  : colors.primary,
            }}
          />
          <View
            style={{
              height: height * 0.2,
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </AppScreen>
  );
}

export default New;
