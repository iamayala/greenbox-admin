import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { height } from '../constants/dimensions';
import fonts from '../constants/fonts';

const white = '#ffffff';

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.textDark,
  },
  sectionHeader: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
    textTransform: 'capitalize',
  },
  subheader: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textGrey,
  },
  normalText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textDark,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textGrey,
  },
  inputField: {
    height: 39.55,
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: 1.25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  modal: {
    height: height * 0.7,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: white,
  },
  searchInput: {
    height: 51.57,
    backgroundColor: colors.backgroundGrey,
    borderRadius: 15,
  },
  link: {
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default styles;
