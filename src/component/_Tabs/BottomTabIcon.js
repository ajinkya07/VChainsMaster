import React, { Component, createRef } from 'react';
import {
    Text, View, Image, StyleSheet, Animated, BackHandler, Alert, ToastAndroid,
    Modal, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Platform
} from 'react-native';
import {connect} from 'react-redux'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



class BottomTabIcon extends Component {
    render() {
        const { color, focused,totalCartCountData } = this.props;
        let count = totalCartCountData.count

        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                {focused ?
                    <Image style={{ height: hp(3.5), width: hp(3.5), marginTop: -7 }}
                    source={require('../../assets/image/Tabs/cart_grey.png')}
                    />

                    :
                    <Image style={{ height: hp(2.9), width: hp(2.9),marginTop:-1 }}
                    source={require('../../assets/image/Tabs/cart_lightgrey.png')}
                    />
                }

                <View
                    style={{
                        position: 'absolute',
                        right: -7,
                        top: -5,
                        backgroundColor: 'red',
                        padding: 3,
                        borderRadius: 9,
                        width: 18,
                        height: 18,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {count}
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    totalCartCountData: state.cartContainerReducer.totalCartCountData,

})

export default connect(mapStateToProps)(BottomTabIcon);
