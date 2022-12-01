import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import AppButton from '../../component/AppButton';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import ProductCard from '../../component/ProductCard';
import AddressItem from '../../component/AddressItem';
import NotificationItem from '../../component/NotificationItem';
import NoData from '../../component/NoData';
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
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
  },
});

function About({ route, navigation }) {
  const [message, setMessage] = useState(null);
  const [location, setLocation] = useState([]);

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
        <Text style={[styles.text, { fontSize: 18 }]}>About</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod orci ut eros
          hendrerit aliquet sit amet at mauris. Ut sed lorem nec libero pulvinar viverra at ac arcu.
          Fusce tempor varius lectus, nec condimentum ex vulputate eget. Donec accumsan ligula
          felis, vitae dapibus magna consectetur non. Sed ex erat, convallis vitae porta nec,
          consectetur a nunc. Donec felis sem, faucibus et purus et, ultricies tristique arcu. Sed
          efficitur justo eu posuere sagittis. Sed id congue enim. Duis eget elit mollis, tincidunt
          libero quis, tincidunt odio. Duis in varius nisi. Duis vitae est urna. Sed rutrum gravida
          erat, ac euismod libero ultrices a. Aenean pulvinar a ipsum non lacinia. Aenean sed turpis
          et diam pellentesque ultrices. Duis sapien sapien, pellentesque tempor sem maximus
          {' \n'}
          {' \n'}
          venenatis venenatis sapien. Cras tristique risus ex, id placerat velit bibendum ac.
          Pellentesque ornare tempor lorem nec aliquet. Aenean dapibus, dolor sit amet euismod
          viverra, mi magna pharetra metus, nec varius tortor orci id odio. Vestibulum aliquam
          aliquet ex ut finibus. Fusce aliquam sagittis scelerisque. Praesent vitae mollis eros.
          Aenean et lacus eu nulla iaculis blandit. Interdum et malesuada fames ac ante ipsum primis
          in faucibus. Donec efficitur sit amet mi sed egestas. Vivamus dapibus dapibus neque, nec
          pretium libero dapibus sit amet. Cras at convallis nulla. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse hendrerit laoreet
          arcu, sed condimentum massa consequat eu. Fusce sed blandit ex. Morbi diam nibh, vehicula
          et vestibulum finibus, blandit non orci. Nunc a hendrerit ante. Ut volutpat neque enim,
          vel luctus sem rhoncus eget. Phasellus et nisl vitae metus hendrerit sollicitudin et at
          {' \n'}
          {' \n'}
          metus. Nulla facilisis hendrerit eros, quis fermentum nunc gravida et. Suspendisse tempus
          accumsan orci et blandit. In ut tincidunt mi, sit amet ornare nibh. Aenean nulla ligula,
          congue eu consequat quis, sollicitudin at tellus. In suscipit, velit viverra vehicula
          commodo, tortor ipsum convallis orci, non convallis libero mi a mi. Proin vitae laoreet
          elit. Nam vel augue dolor. Nunc sit amet varius nulla, ac congue mi. Proin convallis
          congue dolor, ut commodo enim pulvinar consequat. Suspendisse et metus dignissim, congue
          nisi id, interdum metus. Quisque pretium tempus rutrum. In accumsan auctor risus, eu
          laoreet sem tincidunt eu. Pellentesque cursus dui et fringilla ultrices. Pellentesque
          porttitor, sapien ut fringilla finibus, tortor elit tempor tortor, a auctor lacus odio sed
          massa. Cras venenatis massa vel ipsum luctus, et iaculis metus porttitor. Nam mollis eros
          at nisi vestibulum malesuada.
        </Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </AppScreen>
  );
}

export default About;
