import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native'
import { Container } from 'native-base';
import containerStyle from '@container/_ContainerStyle'
import _Header from '@header/_Header'
import { NavigationContainer } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import _Tabs from '@tabs/_Tabs'

class _Container extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { showLoading, children, title, showHeader, showSearch,
            showNotification, showCalling, showLogo, headerColor,
            onNotificationPress, showBack, onSearchPress,
            onCallingPress, profilePic } = this.props

        const { mainContainer } = containerStyle

        return (
            <Container style={mainContainer} >
                {
                    showHeader && <_Header
                        title={title}
                        headerColor={headerColor}
                        // showHeader={showHeader}
                        showSearch={showSearch}
                        showNotification={showNotification}
                        showCalling={showCalling}
                        showLogo={showLogo}
                        showBack={showBack}

                        onSearchPress={onSearchPress}
                        onCallingPress={onCallingPress}
                        onNotificationPress={onNotificationPress}
                    >
                    </_Header>
                }
                {children}
            </Container>
        )
    }
}

export default _Container

// {
//     showHeader &&  
//     <_Header title={title}
//      profilePic={profilePic}
//       showSearch={showSearch} 
//        showBack={showBack} 
//        onSearchPress={onSearchPress} 
//        onProfilePress={onProfilePress} ></_Header> 
// }