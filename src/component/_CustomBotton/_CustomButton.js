import React, { Component } from 'react'
import {
    Card, CardItem,Left,
} from 'native-base'

import {
    StyleSheet, View, TouchableOpacity, Text, Dimensions,Image
} from 'react-native';
import _Text from '@text/_Text'
import { color } from '@values/colors';
import { strings } from '@values/strings'

var { width, height } = Dimensions.get('window')

export default class _CustomButton extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        return (
            <TouchableOpacity
                style={{
                    marginTop: this.props.marginTop,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    marginRight: this.props.marginRight || 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: this.props.alignSelf,

                }}
                activeOpacity={this.props.disabled ? 1 : 0.7}
                onPress={() => !this.props.disabled && this.props.onPress()}>

                <View
                    opacity={this.props.disabled ? 0.5 : 1}
                    style={[styles.LinearGradientStyle, {
                        flexDirection: this.props.image? "row":undefined,
                        height: this.props.height,
                        width: this.props.width,
                        paddingLeft: this.props.padding,
                        paddingRight: this.props.padding,
                        backgroundColor: this.props.backgroundColor || color.brandColor
                    }
                    ]}
                >

                    <Text style={[styles.buttonText, {
                        color: this.props.textColor ? this.props.textColor : '#fff',
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight ? this.props.fontWeight : undefined}]}>
                        {this.props.title}
                    </Text>

                </View>

            </TouchableOpacity>

        )
    }

}



const styles = StyleSheet.create({

    LinearGradientStyle: {
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        alignItems: 'center',
        textAlign: 'center',
    },

});



