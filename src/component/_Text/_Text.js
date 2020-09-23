
import React, { Component } from 'react';
import { Text } from 'react-native';
import { color } from '@values/colors';
import { fontSize, fontWeight } from '@values/dimens';

var defaultFontSize = fontSize.fsPrimary;
var defaultFontWeight = fontWeight.fwDefault;

export default class _Text extends Component {

  render() {

    const {
      children: propChildren,
      fsHeading,
      fsPrimary,
      fwHeading,
      fwPrimary,
      fsNote,
      fsLogoName,
      bold,
      style,
      styles,
      fsSmall,
      fsExtraSmall,
      fwSmall,
      fsExtraLarge,
      numberOfLines,
      fwExtraLarge,
      textColor,
      fsLarge,
      fsMedium
    } = this.props;


    if (fsHeading) {

      defaultFontSize = fontSize.fsHeading;

    } else if (fsPrimary) {

      defaultFontSize = fontSize.fsPrimary;

    } else if (fsSmall) {

      defaultFontSize = fontSize.fsSmall;

    } else if (fsExtraLarge) {

      defaultFontSize = fontSize.fsExtraLarge;

    } else if (fsExtraSmall) {

      defaultFontSize = fontSize.fsExtraSmall;

    }
    else if(fsNote)
    {
      defaultFontSize = fontSize.fsNote;
    }
    else if(fsLogoName)
    {
      defaultFontSize = fontSize.fsLogoName;
    }
    else if(fsLarge)
    {
      defaultFontSize = fontSize.fsLarge;
    }
    else if(fsMedium)
    {
      defaultFontSize = fontSize.fsMedium;
    }
    
    else {

      defaultFontSize = fontSize.fsPrimary;

    }

    if (fwHeading) {

      defaultFontWeight = fontWeight.fwHeading;

    } else if (fwPrimary) {

      defaultFontWeight = fontWeight.fwPrimary;

    } else if (fwSmall) {

      defaultFontWeight = fontWeight.fwSmall;

    } else if (fwExtraLarge) {

      defaultFontWeight = fontWeight.fwExtraLarge;

    }
    else if (bold) {

      defaultFontWeight = fontWeight.bold;

    }
    else {

      defaultFontWeight = fontWeight.fwDefault;

    }
  return (
      <Text
        numberOfLines={numberOfLines}
        style={[{
          fontSize: defaultFontSize,
          fontWeight: defaultFontWeight,
          color: textColor ? textColor : color.black,
        },style]}>
        {propChildren}
      </Text>

    );

  }

}