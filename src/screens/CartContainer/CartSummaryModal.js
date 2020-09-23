import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import IconPack from '../utils/IconPack';
import {ScrollView} from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');

export default class CartSummaryModal extends Component {
  state = {
    isModalVisible: false,
    check: {},
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  checkBox_Test = id => {
    const checkCopy = {...this.state.check};
    if (checkCopy[id]) checkCopy[id] = false;
    else checkCopy[id] = true;
    this.setState({check: checkCopy});
  };
  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button title="Show modal" onPress={this.toggleModal} />
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          transparent={true}
          onRequestClose={() => alert('Close')}
          style={{margin: 28}}>
          <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={() =>
              this.setState({
                isModalVisible: false,
              })
            }>
            <>
              <View style={styles.flex}>
                <View style={styles.cartSummaryContainer}>
                  <Text style={styles.cartSummaryText}>Cart Summary</Text>
                </View>

                <FlatList
                  style={{backgroundColor: '#ffffff'}}
                  showsVerticalScrollIndicator={false}
                  data={[
                    {
                      id: 1,
                      category: 'IMP ASSEMBLE',
                      Description:
                        ' - Design No: IMP ASS 001(Grows Wt : 0.000, Net Wt: 0.000, Quantity: 1)',
                      TotalQuantity: 2,
                      TotalWT: 2,
                    },

                    {
                      id: 2,
                      category: 'Choco Chains',
                      Description:
                        ' - Design No: IMP ASS 001(Grows Wt : 0.000, Net Wt: 0.000,Quantity: 1)',
                      TotalQuantity: 2,
                      TotalWT: 2,
                    },

                    {
                      id: 3,
                      category: 'IMP ASSEMBLE',
                      Description:
                        ' - Design No: IMP ASS 001(Grows Wt : 0.000, Net Wt: 0.000,Quantity: 1)',
                      TotalQuantity: 2,
                      TotalWT: 2,
                    },
                  ]}
                  renderItem={({item}) => (
                    <View
                      style={{
                        marginHorizontal: 16,
                        marginTop: 20,
                      }}>
                      <View style={{marginBottom: 20}}>
                        <Text>{`category: ${item.category}`}</Text>
                      </View>
                      <View style={{marginBottom: 30}}>
                        <Text>{`Description: \n${item.Description}`}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <Text>{`Total Quantity: ${item.TotalQuantity}`}</Text>
                        <Text>{`Total WT: ${item.TotalWT}`}</Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: '#ddd',
                          borderBottomWidth: 0.8,
                        }}></View>
                    </View>
                  )}
                />
                <View style={styles.buttonContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 30,
                    }}>
                    <View>
                      <Text style={{fontSize: 16}}>Total WT: 276.000</Text>
                    </View>
                    <View style={{marginLeft: 30}}>
                      <Text style={{fontSize: 16}}>Total Quantity: 6</Text>
                    </View>
                  </View>
                  <ActionButtonRounded
                    title="OK"
                    onButonPress={() => Alert.alert('OKPressed')}
                    containerStyle={styles.buttonStyle}
                  />
                </View>
              </View>
              <View style={styles.closeIconView}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isModalVisible: false,
                    })
                  }>
                  <Image style={styles.closeIcon} source={IconPack.RATE} />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </Modal>
   
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 15,
    marginBottom: 42,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  flex: {
    flex: 1,
  },
  cartSummaryContainer: {
    height: 50,
    backgroundColor: '#11255a',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cartSummaryText: {
    fontSize: 21,
    fontFamily: 'Helvetica',
    color: '#fbcb84',
    marginLeft: 10,
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: 91,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconView: {
    position: 'absolute',
    top: 14,
    right: 10,
    bottom: 0,
  },
  categoryContainer: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  categoryText: {
    marginLeft: 32,
    fontFamily: 'Helvetica',
    fontSize: 16,
  },
  checkBox: {
    marginRight: 12,
  },
});
///--------------------------------ActionButton------------------
const ActionButtonRounded = ({title, onButonPress, containerStyle}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onButonPress();
      }}>
      <View
        style={[
          actionButtonRoundedStyle.mainContainerStyle,
          containerStyle || null,
        ]}>
        <View style={actionButtonRoundedStyle.innerContainer}>
          <Text style={actionButtonRoundedStyle.titleStyle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const actionButtonRoundedStyle = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: '#11255a',
    height: 44,
    width: width - 255,
    justifyContent: 'center',
    borderRadius: 40,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#fbcb84',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});
