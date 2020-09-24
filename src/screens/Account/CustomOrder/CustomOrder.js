import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,ActivityIndicator
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { color } from '@values/colors';
import {urls} from '@api/urls';
import {connect} from 'react-redux';
import {getCustomOrderList} from '@accountCustomOrder/CustomOrderAction';
import {Toast} from 'native-base'
import _Text from '@text/_Text';
import Theme from '../../../values/Theme';
import IconPack from '@login/IconPack';


class CustomOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successCustomVersion: 0,
      errorCustomVersion: 0,
      };
      userId = global.userId;

  }

  componentDidMount = async () => {
    const data = new FormData();
    data.append('user_id', userId);
    data.append('user_type', 'client');

    await this.props.getCustomOrderList(data);
};

static getDerivedStateFromProps(nextProps, prevState) {
    const { successCustomVersion, errorCustomVersion } = nextProps;

    let newState = null;

    if (successCustomVersion > prevState.successCustomVersion) {
        newState = {
            ...newState,
            successCustomVersion: nextProps.successCustomVersion,
        };
    }
    if (errorCustomVersion > prevState.errorCustomVersion) {
        newState = {
            ...newState,
            errorCustomVersion: nextProps.errorCustomVersion,
        };
    }

    return newState;
}

async componentDidUpdate(prevProps, prevState) {
    const { customOrderData } = this.props;

    if (this.state.successCustomVersion > prevState.successCustomVersion) {

    }
    if (this.state.errorCustomVersion > prevState.errorCustomVersion) {
        Toast.show({
            text: this.props.errorMsg,
            duration: 2500,
        });
    }
}

  

 customOrderDetails = (item) => {
  const {customOrderData } = this.props

   let url2 = urls.imageUrl + customOrderData.path + item.image_name


   return (
    <View style={styles.viewContainer}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageStyle}
          source={{ uri: url2 }}
          defaultSource={IconPack.APP_LOGO}
        />
      </View>
        <View style={styles.contentRowStyle}>

          <View style={{ flexDirection: 'column' }}>
            {item.label.map(
              (key, i) => {
                return (
                  <Text style={{
                      marginTop: 5,
                      ...Theme.ffLatoRegular15,
                      
                    }}>
                    {key.replace('_', ' ')}
                  </Text>
                );
              },
            )}
          </View>

         <View style={{ flexDirection: 'column' }}>
           {item.value.map(
             (value, j) => {
               return (
                 <Text
                   style={{
                     marginTop: 5,
                     ...Theme.ffLatoRegular15,
                     color: '#000000',
                     textAlign: 'right',
                   }}>
                   {value ? value : '-'}
                 </Text>
               );
             },
           )}
         </View>

      </View>
      <View style={styles.bottomLine} />

    </View>
  );
};

noDataFound = msg => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(90),
      }}>
      <Image
        source={require('../../../assets/gif/noData.gif')}
        style={{height: hp(20), width: hp(20),}}
      />
      <Text style={{fontSize: 18, fontWeight: '400', textAlign: 'center',marginTop:10}}>
        {msg}
      </Text>
    </View>
  );
};

renderLoader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: hp(100),
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={color.brandColor} />
    </View>
  );
};


  render() {
    const {customOrderData } = this.props
    const data = customOrderData && customOrderData.data && customOrderData.data.data_list


    return (
      <SafeAreaView style={{ flex: 1,backgroundColor: '#f3fcf9' }}>
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
        {data && data.length > 0 &&
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, i) => {
              return  this.customOrderDetails(item)}
              )
            }
          </ScrollView>
        }
        {!this.props.isFetching && customOrderData.length == 0
          ? this.noDataFound(this.props.errorMsg)
          : null}

        {this.props.isFetching ? this.renderLoader() : null}

      </SafeAreaView>

    );
  }
}

{/* 
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
        </View> */}


function mapStateToProps(state) {
  return {
      isFetching: state.accountCustomOrderReducer.isFetching,
      error: state.accountCustomOrderReducer.error,
      errorMsg: state.accountCustomOrderReducer.errorMsg,
      successCustomVersion: state.accountCustomOrderReducer.successCustomVersion,
      errorCustomVersion: state.accountCustomOrderReducer.errorCustomVersion,
      customOrderData: state.accountCustomOrderReducer.customOrderData,

  };
}

export default connect(mapStateToProps, { getCustomOrderList })(CustomOrder);


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
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 0.6,
    marginVertical: 10,
    marginHorizontal:10

  },
  contentRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'ios' ? 4 : 2,
    marginHorizontal:10
  },
});
