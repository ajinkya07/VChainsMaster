import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { urls } from '@api/urls';
import { getOrderHistoryList } from '@orderHistory/OrderHistoryAction';
import { Toast } from 'native-base';
import _Text from '@text/_Text';
import { color } from '@values/colors';
import Theme from '../../../values/Theme';

var userId = '';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successOrderHistoryVersion: 0,
      errorOrderHistoryVersion: 0,
    };
    userId = global.userId;
  }

  componentDidMount = async () => {
    const data = new FormData();
    data.append('user_id', userId);

    await this.props.getOrderHistoryList(data);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successOrderHistoryVersion, errorOrderHistoryVersion } = nextProps;

    let newState = null;

    if (successOrderHistoryVersion > prevState.successOrderHistoryVersion) {
      newState = {
        ...newState,
        successOrderHistoryVersion: nextProps.successOrderHistoryVersion,
      };
    }
    if (errorOrderHistoryVersion > prevState.errorOrderHistoryVersion) {
      newState = {
        ...newState,
        errorOrderHistoryVersion: nextProps.errorOrderHistoryVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { orderHistoryData } = this.props;

    if (
      this.state.successOrderHistoryVersion >
      prevState.successOrderHistoryVersion
    ) {
      this.setState({
        cartStateData: orderHistoryData,
      });
    }
    if (
      this.state.errorOrderHistoryVersion > prevState.errorOrderHistoryVersion
    ) {
      Toast.show({
        text: this.props.errorMsg,
        duration: 2500,
      });
    }
  }

  noDataFound = msg => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: hp(80),
        }}>
        <Image
          source={require('../../../assets/gif/noData.gif')}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>
          {msg}
        </Text>
      </View>
    );
  };

  orderHistoryView = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('OrderHistoryDetail', { data: item })
        }>
        <View style={{ backgroundColor: color.white }}>
          <Text style={{ ...Theme.ffLatoBold13, color: '#000' }}>
            Order Number:{item.order_id}
          </Text>
          <View style={styles.rowTextStyle}>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              Order Date
            </Text>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              {item.order_date}
            </Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              Delivery Date
            </Text>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              {item.delivery_date}
            </Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              Total Weight
            </Text>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              {parseInt(item.total_weight).toFixed(2)}
            </Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              Remarks
            </Text>
            <Text style={{ ...Theme.ffLatoRegular13, color: '#000' }}>
              {item.remarks}
            </Text>
          </View>
          <View style={styles.bottomLine}></View>
        </View>
      </TouchableOpacity>
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
    const { orderHistoryData } = this.props;


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
        <_CustomHeader
          Title="Order History"
          // RightBtnIcon1={require('../../../assets/image/BlueIcons/Search-White.png')}
          RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification-White.png')}
          LeftBtnPress={() => this.props.navigation.goBack()}
          // RightBtnPressOne={() =>this.props.navigation.navigate('SearchScreen')}
          RightBtnPressTwo={() => this.props.navigation.navigate('Notification')}
          rightIconHeight2={hp(3.5)}
          backgroundColor="#19af81"
        />

        {orderHistoryData && orderHistoryData.length > 0 && (
          <View style={styles.viewContainer}>
            <FlatList
              data={orderHistoryData}
              refreshing={this.props.isFetching}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{}}>{this.orderHistoryView(item)}</View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {!this.props.isFetching && this.props.orderHistoryData.length === 0
          ? this.noDataFound(this.props.errorMsg)
          : null}

        {this.props.isFetching ? this.renderLoader() : null}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  viewContainer: {
    marginTop: Platform.OS === 'ios' ? 12 : 10,
    marginHorizontal: 16,
    backgroundColor: color.white,
    flex: 1,
  },
  rowTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Platform.OS === 'ios' ? 4 : 2,
  },
  bottomLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginVertical: 10,
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.orderHistoryReducer.isFetching,
    error: state.orderHistoryReducer.error,
    errorMsg: state.orderHistoryReducer.errorMsg,
    successOrderHistoryVersion:
      state.orderHistoryReducer.successOrderHistoryVersion,
    errorOrderHistoryVersion:
      state.orderHistoryReducer.errorOrderHistoryVersion,
    orderHistoryData: state.orderHistoryReducer.orderHistoryData,
  };
}

export default connect(
  mapStateToProps,
  { getOrderHistoryList },
)(OrderHistory);

