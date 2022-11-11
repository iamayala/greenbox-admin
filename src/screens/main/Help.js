import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import styled from '../../style/styles';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import { height, width } from '../../constants/dimensions';
import { baseURL, get, post } from '../../utils/Api';
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
  messageView: {
    backgroundColor: colors.borderGrey,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // alignSelf: 'left',
    maxWidth: width * 0.7,
  },
  textMessage: {
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  inputField: {
    height: 40.67,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundGrey,
    borderRadius: 14,
    marginRight: 10,
    paddingHorizontal: 15,
    fontFamily: fonts.medium,
  },
  btn: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.backgroundGrey,
    marginRight: 10,
  },
});

function Help({ route, navigation }) {
  const [alert, setAlert] = useState(null);
  const [selectedQuestion, setselectedQuestion] = useState(null);
  const [questions, setquestions] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = () => {
    get(`${baseURL}/faq`).then((res) => {
      if (res.data.status == 200) {
        const result = res.data.data;
        result
          .filter((item) => item.faq_app == 2)
          .sort((a, b) => {
            return b.faq_rating - a.faq_rating;
          });
        setquestions(result);
      }
    });
  };

  const rateQuestion = (item, type) => {
    post(`${baseURL}/updatefaq`, {
      faq_rating: type == 'up' ? item.faq_rating + 1 : item.faq_rating - 1,
      faq_id: item.faq_id,
    }).then((res) => {
      if (res.data == 200) {
        getQuestions();
        setAlert('Thank you for your feedback');
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    });
  };

  const renderQuestion = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setselectedQuestion(item)}
        style={{ paddingVertical: 20, borderBottomColor: colors.borderGrey, borderBottomWidth: 1 }}>
        <View
          style={{
            // height: 50,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{ fontFamily: fonts.medium, color: colors.textDark, flex: 1, marginRight: 5 }}>
            {item.faq_question}
          </Text>
          <Feather
            name={item == selectedQuestion ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.iconDark}
          />
        </View>
        {item == selectedQuestion && (
          <>
            <Text style={{ fontFamily: fonts.regular, color: colors.textGrey, marginTop: 5 }}>
              {item.faq_answer}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
              <Text style={{ fontFamily: fonts.medium, marginRight: 20 }}>Was this helpful?</Text>
              <TouchableOpacity onPress={() => rateQuestion(item, 'up')} style={styles.btn}>
                <Image source={{ uri: emojis.yes }} style={{ height: 16, width: 16 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => rateQuestion(item, 'down')} style={styles.btn}>
                <Image source={{ uri: emojis.no }} style={{ height: 16, width: 16 }} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {alert && <ToastMessage label={alert} onPress={() => setAlert(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.text, { fontSize: 18 }]}>Support</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', display: 'none' }}>
            <View
              style={{
                height: 7,
                width: 7,
                borderRadius: 10,
                marginRight: 5,
                backgroundColor: colors.success,
              }}
            />
            <Text style={[styles.text, { fontSize: 11, color: colors.success }]}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          onRefresh={() => getQuestions()}
          refreshing={loading}
          data={questions}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 5,
            paddingBottom: height * 0.3,
          }}
          renderItem={renderQuestion}
        />
      </View>
    </AppScreen>
  );
}

export default Help;
