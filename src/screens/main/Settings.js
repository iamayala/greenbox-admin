import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import ToastMessage from '../../component/ToastMessage';
import styled from '../../style/styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppButton from '../../component/AppButton';
import PromptModal from '../../component/PromptModal';
import Modal from 'react-native-modal';
import { baseURL, post } from '../../utils/Api';
import { clearLocalData } from '../../utils/Helpers';

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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    height: 60,
    marginHorizontal: 20,
  },
});

export class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      location: [],
      notification: null,
      hideOldPwd: true,
      oldPwd: '',
      hideNewPwd: true,
      newPwd: '',
      deletemodal: false,
      langmodal: false,
      hidePwd: true,
      pwd: '',
      deleting: false,
      updating: false,
      profile: null,
    };
  }

  componentDidMount() {
    const { profile } = this.props.route.params;
    this.setState({ profile });
  }

  handleDeleteAccount = () => {
    this.setState({ deleting: true });
    post(`${baseURL}/deleteaccount`, {
      customer_phone_number: this.state.profile.customer_phone_number,
      customer_password: this.state.pwd,
    }).then((res) => {
      if (res.data.status == 404) {
        this.setState({ message: 'Failed! Please make sure you provide the right credentials.' });
      } else if (res.data.status == 200) {
        this.handleRemoveData();
      }
      this.delete.close();
      this.setState({ deleting: false });
      setTimeout(() => {
        this.setState({ message: null });
      }, 2000);
    });
  };

  handleRemoveData = () => {
    clearLocalData().then(() => {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'AuthenticationStack' }],
      });
    });
  };

  handleUpdatePassword = () => {
    this.setState({ updating: true });
    post(`${baseURL}/admin/updatepassword`, {
      admin_name: this.state.profile.admin_name,
      old_password: this.state.oldPwd,
      new_password: this.state.newPwd,
    }).then((res) => {
      if (res.data.message == 'wrong') {
        this.setState({
          message: 'Failed! Please make sure you provide the right current password.',
        });
      } else if (res.data.message == 'success') {
        this.setState({
          message: 'Success! Your password was successfully updated!',
        });
      }
      this.pwd.close();
      this.setState({ updating: false, newPwd: '', oldPwd: '' });
      setTimeout(() => {
        this.setState({ message: null });
      }, 2000);
    });
  };

  render() {
    const {
      message,
      notification,
      hideNewPwd,
      hideOldPwd,
      langmodal,
      hidePwd,
      oldPwd,
      newPwd,
      deleting,
      updating,
    } = this.state;
    const { navigation } = this.props;
    return (
      <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
        {message && (
          <ToastMessage label={message} onPress={() => this.setState({ message: null })} />
        )}

        <Modal isVisible={langmodal}>
          <PromptModal
            text="Unfortunately, we haven't added new languages yet! We will keep you posted when we add a new language."
            yes={() => {
              this.setState({ langmodal: false });
            }}
          />
        </Modal>

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
          <Text style={[styles.text, { fontSize: 18 }]}>Settings</Text>
          <TouchableOpacity style={styles.topBtn}>
            <Feather name="more-vertical" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.itemContainer}>
            <Feather name="bell" size={20} color={colors.iconDark} />
            <Text style={[styles.text, { fontSize: 16, flex: 1, marginLeft: 20 }]}>
              Notifications
            </Text>
            <Switch
              trackColor={{ false: colors.backgroundGrey, true: colors.backgroundGrey }}
              thumbColor={notification ? colors.primary : colors.secondary}
              ios_backgroundColor={colors.backgroundGrey}
              onValueChange={() => setnotification(!notification)}
              value={notification}
            />
          </View>

          {/* <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => this.setState({ langmodal: true })}>
            <Feather name="globe" size={20} color={colors.iconDark} />
            <Text style={[styles.text, { fontSize: 16, flex: 1, marginLeft: 20 }]}>
              Change Language
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.text, { fontSize: 16, color: colors.textGrey, marginRight: 5 }]}>
                English
              </Text>
              <Feather name="chevron-right" size={20} color={colors.iconDark} />
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => this.pwd.open()}>
            <Feather name="lock" size={20} color={colors.iconDark} />
            <Text style={[styles.text, { fontSize: 16, flex: 1, marginLeft: 20 }]}>
              Change Password
            </Text>
            <Feather name="chevron-right" size={20} color={colors.iconDark} />
          </TouchableOpacity>
        </ScrollView>

        <RBSheet
          ref={(ref) => {
            this.pwd = ref;
          }}
          animationType="slide"
          openDuration={180}
          customStyles={{
            container: {
              flex: 1,
            },
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.bold,
                fontSize: 17,
                paddingVertical: 15,
              }}>
              Change Password
            </Text>
            <ScrollView
              keyboardShouldPersistTaps="always"
              style={{ marginHorizontal: 20 }}
              contentContainerStyle={{ paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}>
              <View style={{ marginVertical: 10 }}>
                <Text style={styled.label}>Old Password</Text>
                <View style={styled.inputField}>
                  <TextInput
                    style={styled.textInput}
                    secureTextEntry={hideOldPwd}
                    placeholder="********"
                    value={oldPwd}
                    onChangeText={(e) => this.setState({ oldPwd: e })}
                    placeholderTextColor={colors.iconGrey}
                  />
                  <TouchableOpacity onPress={() => this.setState({ hideOldPwd: !hideOldPwd })}>
                    <Feather
                      name={hideOldPwd ? 'eye-off' : 'eye'}
                      size={16}
                      color={colors.iconDark}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={styled.label}>New Password</Text>
                <View style={styled.inputField}>
                  <TextInput
                    style={styled.textInput}
                    secureTextEntry={hideNewPwd}
                    placeholder="********"
                    value={newPwd}
                    onChangeText={(e) => this.setState({ newPwd: e })}
                    placeholderTextColor={colors.iconGrey}
                  />
                  <TouchableOpacity onPress={() => this.setState({ hideNewPwd: !hideNewPwd })}>
                    <Feather
                      name={hideNewPwd ? 'eye-off' : 'eye'}
                      size={16}
                      color={colors.iconDark}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <AppButton
                label="Change Password"
                loading={updating}
                onPress={
                  updating || newPwd == '' || oldPwd == ''
                    ? () => {}
                    : () => this.handleUpdatePassword()
                }
              />
            </ScrollView>
          </View>
        </RBSheet>
      </AppScreen>
    );
  }
}

export default Settings;
