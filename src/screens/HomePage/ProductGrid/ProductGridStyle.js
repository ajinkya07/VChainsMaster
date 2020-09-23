import React, {Component} from 'react';
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
import {color} from '@values/colors';

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

export default {
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

  gridDesign: {
    backgroundColor: color.white,
    height: hp(42),
    width: wp(46),
    borderColor: color.gray,
    borderWidth: 0.4,
    borderRadius: 15,
    marginHorizontal: hp(1),
  },

  gridItemDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(46),
  },
  gridImage: {
    height: hp(18),
    width: wp(45),
    top: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  latestTextView: {
    flexDirection: 'row',
    width: wp(46),
    marginTop: hp(0.5),
    paddingHorizontal: hp(0.8),
  },
  latestTextView2: {
    flexDirection: 'row',
    width: wp(46),
    marginTop: hp(0.5),
    paddingHorizontal: hp(0.8),
  },
  border: {
    marginTop: hp(0.8),
    borderTopColor: '#d7d7d7',
    borderWidth: 0.4,
    width: wp(40),
  },
  iconView: {
    width: wp(48),
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};
