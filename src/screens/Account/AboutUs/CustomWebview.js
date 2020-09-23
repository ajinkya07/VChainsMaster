import React from 'react';
import {
    View, Text,
    ScrollView, StyleSheet,
    ActivityIndicator
} from 'react-native';
import {
    Body, Container,
    Content, Header,
    Left, Right,
    Toast,
} from 'native-base';
import _CustomHeader from '@customHeader/_CustomHeader'
import WebView from 'react-native-webview';
import {color} from '@values/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


export default class CustomWebview extends React.Component {
    constructor(props){
        super(props)
        const data = this.props.route.params.link;
        const title = this.props.route.params.title;

        this.state={
          url:data,
          title:title
        }
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


    render() {
      const{title,url} = this.state

    return (
      <Container style={styles.flex}>
        <_CustomHeader
          Title= {title}
          LeftBtnPress={() => this.props.navigation.goBack()}
          backgroundColor="#19af81"
        />
        <WebView source={{uri: this.state.url ? this.state.url : ''}} />

        {!this.state.url ? this.renderLoader() : null}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
