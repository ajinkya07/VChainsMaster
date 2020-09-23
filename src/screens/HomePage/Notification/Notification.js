import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, Image,ActivityIndicator,
    ScrollView, FlatList, TouchableOpacity
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { connect } from 'react-redux';
import { color } from '@values/colors';
import IconPack from '../../OnBoarding/Login/IconPack';
import {urls} from '@api/urls';

import { getNotificationList } from '@notification/NotificationAction'


const data = [
    { id: '1', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },
    { id: '2', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },
    { id: '3', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },
    { id: '4', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },


]

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successNotificationVersion: 0,
            errorNotificationVersion: 0,
        };
        userId = global.userId;

    }


    componentDidMount = async () => {

        const n = new FormData()

        n.append('user_id', userId)
        n.append('type', 'client')

        this.props.getNotificationList(n)
    };


    static getDerivedStateFromProps(nextProps, prevState) {
        const { successNotificationVersion, errorNotificationVersion } = nextProps;

        let newState = null;

        if (successNotificationVersion > prevState.successNotificationVersion) {
            newState = {
                ...newState,
                successNotificationVersion: nextProps.successNotificationVersion,
            };
        }
        if (errorNotificationVersion > prevState.errorNotificationVersion) {
            newState = {
                ...newState,
                errorNotificationVersion: nextProps.errorNotificationVersion,
            };
        }

        return newState
    }

    async componentDidUpdate(prevProps, prevState) {
        const { } = this.props;
        if (this.state.successNotificationVersion > prevState.successNotificationVersion) {

        }
    }


    showNotifications = (item, index) => {

        let url2 = urls.imageUrl

        
        return (
            <TouchableOpacity 
            disabled={true}
            //onPress={() =>  this.props.navigation.navigate('BannerImage', {
            //    bannerDataImagePath: item.image_name,baseUrl: url2,})}
            >
                <View style={{ paddingTop: hp(0.5), paddingBottom: hp(0.5) }}>
                    <View style={{ flexDirection: 'row', flex: 1, marginLeft: hp(1.5), marginRight: hp(0.5) }}>
                        <View style={{ flex: 0.25, justifyContent: 'flex-start', }}>
                           { item.image_name != '' ?
                            <Image
                                style={{
                                    height: hp(10), width: hp(10), borderRadius: 10,
                                    borderWidth: 0.4, borderColor: color.gray
                                }}
                                source={{uri: url2 + item.image_name}}
                                defaultSource={IconPack.APP_LOGO}
                                resizeMode='cover'
                            /> : 
                            <Image
                                style={{
                                    height: hp(10), width: hp(10), borderRadius: 10,
                                    borderWidth: 0.4, borderColor: color.gray
                                }}
                                source={IconPack.APP_LOGO}
                                defaultSource={IconPack.APP_LOGO}
                                resizeMode='cover'
                            />
                            }
                        </View>

                        <View style={{ alignContent: 'center', justifyContent: 'center', flex: 0.75 }}>
                            <_Text numberOfLines={2} fwPrimary
                                fsMedium style={{ marginRight: hp(3) }}>
                                Title: {item.title}
                            </_Text>
                            <_Text numberOfLines={2} fsPrimary
                                style={{ marginRight: hp(3) }}>
                                Message: {item.sub_title}
                            </_Text>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <_Text numberOfLines={2} note
                                    style={{ marginRight: hp(3) }}>
                                    Order id: {item.order_id}
                                </_Text>
                                <_Text numberOfLines={2} note
                                    style={{ marginRight: hp(3) }}>
                                    Date:{item.created}
                                </_Text>

                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingTop: hp(0.8), marginLeft: wp(22), marginRight: wp(3),
                            alignSelf: 'stretch',
                            borderBottomColor: '#D3D3D3',
                            borderBottomWidth: 1,
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    onRefresh = () => {
        const data = new FormData()

        data.append('user_id', userId)
        data.append('type', 'client')

        this.props.getNotificationList(data)
    }

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
    
      noDataFound = msg => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              bottom: hp(8),
              flex:1
            }}>
            <Image
              source={require('../../../assets/gif/noData.gif')}
              style={{height: hp(20), width: hp(20)}}
            />
            <Text style={{fontSize: 18, fontWeight: '400', textAlign: 'center'}}>
              {msg}
            </Text>
          </View>
        );
      };


    
    render() {
        const { notificationData, isFetching } = this.props

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3fcf9' }}>
                <_CustomHeader
                    Title={'Notifications'}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    rightIconHeight2={hp(3.5)}
                    backgroundColor="#19af81"
                />
                <View style={{ justifyContent: 'center', width: wp(100), paddingVertical: hp(1) }}>
                    <FlatList
                        onRefresh={() => this.onRefresh()}
                        refreshing={isFetching}
                        data={notificationData.data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            this.showNotifications(item, index)
                        )}
                    />
                </View>

                {this.props.isFetching ? this.renderLoader() : null}

                {!this.props.isFetching &&
                  this.props.notificationData.length === 0
                  ? this.noDataFound(this.props.errorMsg)
                  : null}

            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.notificationReducer.isFetching,
        error: state.notificationReducer.error,
        errorMsg: state.notificationReducer.errorMsg,
        successNotificationVersion: state.notificationReducer.successNotificationVersion,
        errorNotificationVersion: state.notificationReducer.errorNotificationVersion,
        notificationData: state.notificationReducer.notificationData,

    };
}

export default connect(mapStateToProps, { getNotificationList })(Notification);
