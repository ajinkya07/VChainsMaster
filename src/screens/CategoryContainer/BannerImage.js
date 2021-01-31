import React, { Component } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    Text, Image, Dimensions,
    Button, ActivityIndicator,
    FlatList, SafeAreaView, Alert,
    TouchableOpacity,
} from 'react-native';
import { color } from '@values/colors';
import { strings } from '@values/strings';
import _Text from '@text/_Text';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper'
import { urls } from '@api/urls'
import ImageZoom from 'react-native-image-pan-zoom';
import IconPack from '@login/IconPack';
import Carousel, { Pagination, ParallaxImage, SliderEntry } from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';



const { width, height } = Dimensions.get('window')


export default class BannerImage extends Component {
    constructor(props) {
        super(props);

        const data = this.props.route.params.bannerDataImagePath;
        const url = this.props.route.params.baseUrl;
        const colorCode = this.props.route.params.colorCode;



        this.state = {
            bannerDataImagePath: data,
            baseUrl: url,
            currentPage: 0,
            slider1ActiveSlide: 0,
            colorCode: colorCode

        };
    }

    renderLoader = () => {
        return (
            <View style={{
                position: 'absolute', height: hp(100),
                width: wp(100), alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size="large" color={color.white} />
            </View>
        );
    };


    setCurrentPage = (position) => {
        this.setState({ currentPage: position });
    }

    renderScreen = (item, k) => {
        const { bannerDataImagePath } = this.state
        let url2 = urls.imageUrl + (bannerDataImagePath !== undefined && bannerDataImagePath.zoom_image)
        return (
            <View key={k}>
                <ImageZoom
                    cropWidth={wp(100)}
                    cropHeight={hp(95)}
                    imageWidth={wp(100)}
                    imageHeight={hp(95)}>
                    <FastImage
                        style={{ height: hp(80), width: wp(100), }}
                        source={{
                            uri: url2 + item,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    {/* <Image
                        source={{ uri: url2 + item }}
                        resizeMode='contain'
                        style={{ height: hp(80), width: wp(100) }}
                        defaultSource={IconPack.APP_LOGO}
                    /> */}

                </ImageZoom>
            </View>
        )
    }


    renderPagination = (index, total) => {

        return (
            <View style={{
                position: 'absolute',
                right: wp(45),
                bottom: hp(83),
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{index + 1}</Text> / {total}
                </Text>
            </View>
        )
    }

    carausalView = (item) => {
        const { colorCode, currentPage } = this.state
        return (
            <View style={{
                height: hp(80), width: wp(100),
            }}>
                {item.image_name ?
                    <Swiper
                        removeClippedSubviews={false}
                        showsButtons={item.image_name.length > 1 ? true : false}
                        ref={(swiper) => { this.swiper = swiper; }}
                        index={this.state.currentPage}
                        autoplay={false}
                        showsPagination={true}
                        renderPagination={() => this.renderPagination(this.state.currentPage, item.image_name.length)}
                        dot={<View style={{
                            backgroundColor: 'gray', width: 8, height: 8,
                            borderRadius: 4, marginLeft: 3,
                            marginRight: 3, top: 10
                        }} />}
                        activeDot={<View style={{
                            backgroundColor: color.brandColor, width: 10, height: 10, borderRadius: 5,
                            marginLeft: 3, marginRight: 3, top: 10
                        }} />}
                        onIndexChanged={(page) => this.setCurrentPage(page)}
                        buttonWrapperStyle={{
                            height: hp(7),
                            top: hp(100) - hp(26),
                            position: 'absolute',
                            flex: 1,
                            alignItems: 'center',
                            left: - 10
                        }}
                    // nextButton={
                    //     <View style={{
                    //         alignItems: 'center', justifyContent: 'center', height: 40, width: 70, borderRadius: 20,
                    //         backgroundColor: currentPage !== (item.image_name.length - 1) ? colorCode ? '#' + colorCode : 'gray' : color.white
                    //     }}>
                    //         <_Text bold fsPrimary textColor={color.white}>NEXT</_Text>
                    //     </View>
                    // }
                    // prevButton={
                    //     <TouchableOpacity style={{
                    //         alignItems: 'center', justifyContent: 'center', height: 40, width: 70, borderRadius: 20,
                    //         backgroundColor: (item.image_name.length - 1) <= currentPage ? colorCode ? '#' + colorCode : 'gray' : color.white
                    //     }}>
                    //         <_Text bold fsPrimary textColor={color.white}>PREV</_Text>
                    //     </TouchableOpacity>
                    // }
                    >
                        {(item.image_name).map((page, index) => this.renderScreen(page, index))}
                    </Swiper>
                    : this.renderLoader()
                }
            </View>
        )
    }


    carausalView2 = (bannerData) => {
        let { width, height } = Dimensions.get('window')
        let sliderWidth = width;
        let itemHeight = hp(80);

        return (
            <View style={{ marginBottom: -10 }}>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    hasParallaxImages={true}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={false}
                    autoplayDelay={1400}
                    autoplayInterval={8000}
                    sliderWidth={sliderWidth}
                    sliderHeight={itemHeight}
                    itemWidth={sliderWidth}
                    itemHeight={itemHeight}
                    data={bannerData}
                    renderItem={(item, index) => this.renderScreen(item, index)}
                    hasParallaxImages={true}
                    enableMomentum={true}
                    activeSlideOffset={2}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}

                />
                <Pagination
                    dotsLength={bannerData.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={{ marginTop: -120 }}
                    dotColor={'#303030'}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0
                    }}
                    inactiveDotColor={'gray'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={this._slider1Ref}

                />

            </View>

        )
    }


    render() {
        const { bannerDataImagePath, baseUrl } = this.state
        return (
            <SafeAreaView style={{ height: hp(100), backgroundColor: color.white }}>

                <View style={{ height: hp(7), backgroundColor: color.white }}>
                    <View
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{ flex: 0.1, paddingLeft: hp(3), }}>
                            <Image
                                defaultSource={require('../../assets/image/close1.png')}
                                source={require('../../assets/image/close1.png')}
                                style={{ height: hp(3), width: hp(3) }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: hp(1), }}>
                    {this.carausalView(bannerDataImagePath)}
                </View>

            </SafeAreaView>
        );
    }
}
