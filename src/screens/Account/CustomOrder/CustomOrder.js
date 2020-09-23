import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { color } from '@values/colors';


const CustomOrderDetails = () => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageStyle}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHnx2IxXolP5b4-ZWmOhi6JgsAJDHH7Y1fnw&usqp=CAU',
          }}
          defaultSource={require('../../../assets/image/default.png')}
        />
      </View>
      <View>
        <View style={styles.contentRowStyle}>
          <Text>gross wt:</Text>
          <Text>24</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>net wt:</Text>
          <Text>0</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>length:</Text>
          <Text>18</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>melting id:</Text>
          <Text />
        </View>
        <View style={styles.contentRowStyle}>
          <Text>color:</Text>
          <Text>Full Yellow</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>diameter:</Text>
          <Text />
        </View>
        <View style={styles.contentRowStyle}>
          <Text>hook:</Text>
          <Text>lopster</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>order date:</Text>
          <Text>2020-06-22</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>delivery date:</Text>
          <Text>2020-07-16</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>assign:</Text>
          <Text>1</Text>
        </View>
        <View style={styles.contentRowStyle}>
          <Text>remark:</Text>
          <Text>REDISH YELLOW</Text>
        </View>
        <View style={styles.bottomLine} />
      </View>
    </View>
  );
};
export default class CustomOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <_CustomHeader
          Title='Custom Order History'
         // RightBtnIcon1={require('../../../assets/image/BlueIcons/Search.png')}
          RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification-White.png')}
          LeftBtnPress={() => this.props.navigation.goBack()}
          //RightBtnPressOne={()=> this.props.navigation.navigate('SearchScreen')}
          RightBtnPressTwo={()=> this.props.navigation.navigate('Notification')}
          rightIconHeight2={hp(3.5)}
          LeftBtnPress={() => this.props.navigation.goBack()}
          backgroundColor={color.green}

        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomOrderDetails />
          <CustomOrderDetails />
        </ScrollView>
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 5,
  },
  imageStyle: {
    width: 130,
    height: 160,
    resizeMode: 'contain',
  },
  imageView: {
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginVertical: 10,
  },
  contentRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'ios' ? 4 : 2,
  },
});
