import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { color } from '@values/colors';

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

export default {
  safeAreaView: {
    flex: 1,
    backgroundColor: color.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f3fcf9',
    // marginBottom:hp(1)
  },

  topHeading: {
    flexDirection: 'row',
    marginTop: hp(2),
    width: wp(100),
    paddingLeft: wp(2),
  },
  topHeading1: {
    flexDirection: 'row',
    marginTop: hp(3),
    width: wp(100),
    paddingLeft: wp(2),
  },

  topHeading2: {
    flexDirection: 'row',
    marginTop: hp(5),
    width: wp(100),
    paddingLeft: wp(2),
  },

  topHeading3: {
    flexDirection: 'row',
    marginTop: hp(5),
    width: wp(100),
    paddingLeft: wp(2),
  },

  heading: {
    width: wp(65),
    paddingLeft: Platform.OS === 'ios' ? wp(2) : wp(1),
  },
  watchAllView: {
    width: wp(35),
    paddingRight: wp(4),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  watchTouchableView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchAllImage: {
    height: hp(1.6),
    width: hp(1.6),
    marginLeft: hp(0.8),
    top: 1,
  },

  horizontalCategory: {
    paddingLeft: wp(4),
  },

  categoryView: {
    alignItems: 'center',
    marginTop: hp(1.9),
    justifyContent: 'center',
    width: wp(23),
    marginRight: Platform.OS === 'ios' ? wp(3) : wp(0.8),
  },

  categoryImage: {
    height: hp(11),
    width: hp(11),
    //borderColor: 'gray',
    //borderWidth: 0.3,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  // for latest design

  horizontalLatestDesign: {
    backgroundColor: color.white,
    height: Platform.OS === 'ios' ? hp(32) : hp(33),
    width: wp(42),
    marginTop: hp(1),
    borderRadius: wp(4.5),
    marginHorizontal: hp(1),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      },
      android: {
        //flex: 1,
        //overflow: 'hidden',
        backgroundColor: '#FFF',
        elevation: 2.2,
      },
    }),
  },

  latestDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: wp(39),
  },

  latestImage: {
    height: hp(17),
    // width: wp(38),
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // borderRadius: 10,
    //top: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  latestTextView: {
    flexDirection: 'row',
    width: wp(39),
    marginTop: hp(0.7),
    paddingHorizontal: hp(0.5),
  },
  latestTextView2: {
    flexDirection: 'row',
    width: wp(39),
    marginTop: hp(0.7),
    paddingHorizontal: hp(0.5),
  },
  border: {
    marginTop: hp(0.8),
    borderTopColor: '#d7d7d7',
    borderWidth: 0.5,
    width: '90%',
    marginLeft: 10,
  },
  iconView: {
    width: wp(39),
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  folloUs: {
    flexDirection: 'row',
    width: wp(90),
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  socialIconView: {
    flexDirection: 'row',
    width: wp(35),
    marginLeft: hp(2.5),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  socialTextView: {
    alignItems: 'center',
    width: wp(60),
    marginRight: hp(2),
  },
  categoryImageViewStyle: {
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        // flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        elevation: 3,
      },
    }),
  },
};
