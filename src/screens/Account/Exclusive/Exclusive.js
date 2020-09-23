import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    Platform,
    ActivityIndicator,
} from 'react-native';
import Theme from '../../../values/Theme';
import { Colors } from 'react-native-paper';
import _CustomHeader from '@customHeader/_CustomHeader';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import { getExclusiveList } from '@exclusive/ExclusiveAction';
import {color} from '@values/colors';



class Exclusive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successExclusiveVersion: 0,
            errorExclusiveVersion: 0,
        };
        userId = global.userId;
    }

    componentDidMount = async () => {
        const data = new FormData();
        data.append('user_id', userId);

        await this.props.getExclusiveList(data);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { successExclusiveVersion, errorExclusiveVersion } = nextProps;

        let newState = null;

        if (successExclusiveVersion > prevState.successExclusiveVersion) {
            newState = {
                ...newState,
                successExclusiveVersion: nextProps.successExclusiveVersion,
            };
        }
        if (errorExclusiveVersion > prevState.errorExclusiveVersion) {
            newState = {
                ...newState,
                errorExclusiveVersion: nextProps.errorExclusiveVersion,
            };
        }

        return newState;
    }

    async componentDidUpdate(prevProps, prevState) {
        const { orderHistoryData } = this.props;

        if (this.state.successExclusiveVersion > prevState.successExclusiveVersion) {

        }
        if (this.state.errorExclusiveVersion > prevState.errorExclusiveVersion) {
            Toast.show({
                text: this.props.errorMsg,
                duration: 2500,
            });
        }
    }

    
    noDataFound = msg => {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(80),
                }}>
                <Image
                    source={require('../../../assets/gif/noData.gif')}
                    style={{ height: hp(20), width: hp(20) }}
                />
                <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', marginTop: 20 }}>
                    {msg}
                </Text>
            </View>
        );
    };


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
        const { exclusiveData,isFetching } = this.props


        return (
            <SafeAreaView style={styles.flex}>
                <_CustomHeader
                    Title="Exclusive Collection"
                    //RightBtnIcon1={require('../../../assets/image/BlueIcons/Search-White.png')}
                    RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification-White.png')}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    //  RightBtnPressOne={() =>this.props.navigation.navigate('SearchScreen')}
                    RightBtnPressTwo={() => this.props.navigation.navigate('Notification')}
                    rightIconHeight2={hp(3.5)}
                    backgroundColor="#19af81"
                />

                {exclusiveData && exclusiveData.final_collection && (
                    <View>
                        <FlatList
                            data={exclusiveData.final_collection}
                            refreshing={this.props.isFetching}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ProductGrid',
                                     { gridData: item,fromExclusive:true, collectionName:item.collection_name })}>
                                    <View style={styles.row}>
                                        <View style={styles.countContainer}>
                                            <Text style={styles.collectionCount}>{item.product_count}</Text>
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>{item.collection_name}</Text>
                                            <View style={styles.borderStyle} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}

                {!isFetching && exclusiveData.final_collection == null ? this.noDataFound(this.props.errorMsg) : null}

                {this.props.isFetching ? this.renderLoader() : null}

            </SafeAreaView>
        );
    }
}


function mapStateToProps(state) {
    return {
        isFetching: state.exclusiveReducer.isFetching,
        error: state.exclusiveReducer.error,
        errorMsg: state.exclusiveReducer.errorMsg,
        successExclusiveVersion: state.exclusiveReducer.successExclusiveVersion,
        errorExclusiveVersion: state.exclusiveReducer.errorExclusiveVersion,
        exclusiveData: state.exclusiveReducer.exclusiveData,
    };
}

export default connect(mapStateToProps, { getExclusiveList })(Exclusive);




const styles = StyleSheet.create({
    viewContainer: {
        marginTop: Platform.OS === 'ios' ? 12 : 10,
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    flex: {
        flex: 1,
        backgroundColor: '#f3fcf9',
    },
    collectionCount: {
        ...Theme.ffLatoBold20,
        color: '#FFFFFF',
    },
    title: {
        ...Theme.ffLatoRegular16,
        color: Colors.black,
        lineHeight: 20,
    },
    subTitle: {
        ...Theme.ffLatoRegular16,
        color: '#757575',
    },
    countContainer: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#8996ab',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
    },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: wp(3.5),
        marginTop: hp(2),
    },
    borderStyle: {
        borderColor: '#d2d2d2',
        borderWidth: 0.7,
        marginTop: hp(2),
    },
});
