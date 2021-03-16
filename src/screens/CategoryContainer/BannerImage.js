import React, { Component } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    Text,
    Image,
    Dimensions,
    Button,
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { color } from '@values/colors';
import { strings } from '@values/strings';
import _Text from '@text/_Text';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import { urls } from '@api/urls';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Gallery from 'react-native-image-gallery';
import IconPack from '@login/IconPack';


export default class BannerImage extends Component {
    constructor(props) {
        super(props);

        const data = this.props.route.params.bannerDataImagePath;
        const url = this.props.route.params.baseUrl;

        this.state = {
            bannerDataImagePath: data,
            baseUrl: url,
            currentPage: 0,
            slider1ActiveSlide: 0,
        };
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
                <ActivityIndicator size="large" color={color.white} />
            </View>
        );
    };

    setCurrentPage = position => {
        this.setState({ currentPage: position });
    };

    renderDefaultImg = () => {
        return (
            <View>
                <Image
                    style={{ height: hp(80), width: wp(100) }}
                    source={IconPack.APP_LOGO}
                    resizeMode='contain'
                />
            </View>
        );
    };

    renderScreen = (item, k) => {
        const { bannerDataImagePath } = this.state;

        let url2 = urls.imageUrl + (bannerDataImagePath !== undefined && bannerDataImagePath.zoom_image);

        return (
            <>
                {Platform.OS == 'ios' ?
                    <View style={{ flex: 1 }}>
                        <ReactNativeZoomableView
                            maxZoom={1.5}
                            minZoom={0.5}
                            zoomStep={0.5}
                            initialZoom={1}
                            bindToBorders={true}
                            onZoomAfter={this.logOutZoomState}
                        >
                            <FastImage
                                style={{ height: hp(80), width: wp(100) }}
                                source={{
                                    uri: url2 + item,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </ReactNativeZoomableView>
                    </View>
                    :
                    <Gallery
                        style={{ backgroundColor: color.white }}
                        images={[{ source: { uri: url2 + item } }]}
                        errorComponent={() => this.renderDefaultImg()}
                    />

                }
            </>
        );
    };

    carausalView = item => {
        return (
            <View
                style={{
                    height: hp(80),
                    width: wp(100),
                }}>
                {item.image_name ? (
                    <Swiper
                        removeClippedSubviews={false}
                        style={{ flexGrow: 1 }}
                        // showsButtons={item.image_name.length > 1 ? true : false}
                        ref={swiper => { this.swiper = swiper }}
                        index={this.state.currentPage}
                        autoplay={false}
                        loop={false}
                        showsPagination={true}
                        // loadMinimal={true}
                        // loadMinimalLoader={<ActivityIndicator size="small" color='gray' />}
                        dot={
                            <View
                                style={{
                                    backgroundColor: 'gray',
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                    marginLeft: 3,
                                    marginRight: 3,
                                }}
                            />
                        }
                        activeDot={
                            <View
                                style={{
                                    backgroundColor: color.black,
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 3
                                }}
                            />
                        }
                        onIndexChanged={page => this.setCurrentPage(page)}
                        buttonWrapperStyle={{
                            flexDirection: 'row',
                            height: hp(7),
                            top: hp(100) - hp(26),
                            position: 'absolute',
                            paddingHorizontal: 20,
                            flex: 1,
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {item.image_name.map((page, index) =>
                            this.renderScreen(page, index),
                        )}
                    </Swiper>
                ) : (
                        this.renderLoader()
                    )}
            </View>
        );
    };


    render() {
        const { bannerDataImagePath, baseUrl } = this.state;
        return (
            <SafeAreaView style={{ height: hp(100), backgroundColor: color.white }}>
                <View style={{ height: hp(7), backgroundColor: color.white }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{ flex: 0.1, paddingLeft: hp(3) }}>
                            <Image
                                defaultSource={require('../../assets/image/close1.png')}
                                source={require('../../assets/image/close1.png')}
                                style={{ height: hp(2.5), width: hp(2.5) }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: hp(1) }}>
                    {this.carausalView(bannerDataImagePath)}
                </View>
            </SafeAreaView>
        );
    }
}