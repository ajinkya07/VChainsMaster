import React, { Component } from 'react';
import {
    Text, View,
    StyleSheet, Button,
    TouchableWithoutFeedback,
    TextInput, ScrollView,
    TouchableOpacity, Alert,
    Image, Platform, SafeAreaView,
    Dimensions, FlatList,
} from 'react-native';
import {
    DatePicker, Footer
} from "native-base";
import moment from 'moment';

import _CustomHeader from '@customHeader/_CustomHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { connect } from 'react-redux';
import { color } from '@values/colors';
import Modal from 'react-native-modal';
import IconPack from '@login/IconPack';
import CheckBox from '@react-native-community/checkbox';
import { Toast,Picker, Icon } from 'native-base'
import { strings } from '@values/strings'

import { searchProducts , searchByCode} from '@search/SearchAction'
import FromDatePicker from './FromDatePicker'
import ToDatePicker from './ToDatePicker'
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
import Theme from '../../../values/Theme';
import { value } from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');

var categoryIds=[]

var karatIds=[]


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gwFrom: '',
            gwTo: '',
            nwFrom: '',
            nwTo: '',
            fromDate: '',
            toDate: '',
            isModalVisible: false,
            isContinueClicked: false,
            check: {},
            karat:{},
            selectedKarat:[],
            collection: [],
            selectedCategories: [],

            successSearchbyCategoryVersion: 0,
            errorSearchbyCategoryVersion: 0,
            searchText: '',
            isSearchCodeVisible:false,

            successSearchbyCodeVersion: 0,
            errorSearchbyCodeVersion: 0,
            search:'',
            isKaratModalVisible:false,
            toggleCheckBox:true,

            successAllParameterVersion: 0,
            errorAllParamaterVersion: 0,
            karatData: [],
            isOkKaratClicked:false,
            selectedStatus:'1',
            

        };

        userId = global.userId;

    }

    componentDidMount = () => {
        const { homePageData } = this.props

        if (homePageData && homePageData.collection) {
            this.setState({
                collection: homePageData && homePageData.collection ? homePageData.collection : [],
            });
        }
    }




    static getDerivedStateFromProps(nextProps, prevState) {
        const { successSearchbyCategoryVersion, errorSearchbyCategoryVersion,
                successSearchbyCodeVersion, errorSearchbyCodeVersion,
                 errorAllParamaterVersion, successAllParameterVersion,
            } = nextProps;

        let newState = null;

        if (successSearchbyCategoryVersion > prevState.successSearchbyCategoryVersion) {
            newState = {
                ...newState,
                successSearchbyCategoryVersion: nextProps.successSearchbyCategoryVersion,
            };
        }
        if (errorSearchbyCategoryVersion > prevState.errorSearchbyCategoryVersion) {
            newState = {
                ...newState,
                errorSearchbyCategoryVersion: nextProps.errorSearchbyCategoryVersion,
            };
        }

        if (successSearchbyCodeVersion > prevState.successSearchbyCodeVersion) {
            newState = {
                ...newState,
                successSearchbyCodeVersion: nextProps.successSearchbyCodeVersion,
            };
        }
        if (errorSearchbyCodeVersion > prevState.errorSearchbyCodeVersion) {
            newState = {
                ...newState,
                errorSearchbyCodeVersion: nextProps.errorSearchbyCodeVersion,
            };
        }

        if (successAllParameterVersion > prevState.successAllParameterVersion) {
            newState = {
              ...newState,
              successAllParameterVersion: nextProps.successAllParameterVersion,
            };
          }
      
          if (errorAllParamaterVersion > prevState.errorAllParamaterVersion) {
            newState = {
              ...newState,
              errorAllParamaterVersion: nextProps.errorAllParamaterVersion,
            };
          }

        return newState;
    }

    async componentDidUpdate(prevProps, prevState) {
        const { searchByCategoryData, searchByCodeData,allParameterData } = this.props;

        if (this.state.successSearchbyCategoryVersion > prevState.successSearchbyCategoryVersion) {
            this.props.navigation.navigate('SearchProductGrid',{fromCodeSearch:false})
        }
        if (this.state.errorSearchbyCategoryVersion > prevState.errorSearchbyCategoryVersion) {
            this.showToast(this.props.errorMsgSearch, 'danger')
        }
        if (this.state.successSearchbyCodeVersion > prevState.successSearchbyCodeVersion) {
            this.props.navigation.navigate('SearchProductGrid',{fromCodeSearch:true})
        }
        if (this.state.errorSearchbyCodeVersion > prevState.errorSearchbyCodeVersion) {
            this.showToast(this.props.errorMsgSearch, 'danger')
        }

        if (this.state.successAllParameterVersion > prevState.successAllParameterVersion) {
                
        }
        if (this.state.errorAllParamaterVersion > prevState.errorAllParamaterVersion) {
    
        }
    
    }


    showToast = (msg, type, duration) => {
        Toast.show({
          text: msg ? msg : strings.serverFailedMsg,
          type: type ? type : 'danger',
          duration: duration ? duration : 2500,
        });
      };
    

    toggleModal = () => {
        this.setState({ isModalVisible: true, isContinueClicked: false });
    };


    closeModal = () => {
        this.setState({ isModalVisible: false, isContinueClicked: false,selectedCategories:[] });
        categoryIds=[]
    };

    checkBox_Test = (id, name) => {

        const { selectedCategories } = this.state

        const checkCopy = { ...this.state.check };
        if (checkCopy[id]) {
            checkCopy[id] = false;

            var index = selectedCategories.map(x => {
                return x.id;
            }).indexOf(id);

            selectedCategories.splice(index, 1);
        }
        else {
            checkCopy[id] = true;

            let array = [];
            let array2 = []
            array = [{ id, name }]
            array2.push(...selectedCategories, ...array);
            console.warn("array",array2);
            this.setState({ selectedCategories: array2 });

        }

        this.setState({ check: checkCopy });
    };


    setToDate =(newDate)=> {
        const { fromDate} = this.state

        // var timeStamp = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
        // var timeStampDate = moment(new Date(timeStamp).toISOString().slice(0, 10)).format('DD-MM-YYYY');

        // if (fromDate != '' && newDate != '' && timeStampDate > newDate) {
        //     alert('Date must be greater than from date');
        //   }
        //   else if (!fromDate && newDate!=''){
        //     this.setState({ toDate: newDate });   
        //   }    

        this.setState({ toDate: newDate });   

    }

    setFromDate =(newDate) =>{
        this.setState({ fromDate: newDate });
        
    }

    onTextChanged = (inputKey, value) => {
        this.setState({
            [inputKey]: value,
        });
    }


    grossWeight = () => {
        const { gwFrom, gwTo, nwFrom, nwTo } = this.state

        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Gross Weight</_Text>
                <View style={{ marginTop: hp(1), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(gwFrom) => this.onTextChanged('gwFrom', gwFrom)}
                            value={gwFrom}
                            placeholder="From"
                            maxLength={10}
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <_Text fsMedium style={{ marginTop: hp(2) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(gwTo) => this.onTextChanged('gwTo', gwTo)}
                            value={gwTo}
                            maxLength={10}
                            placeholder="To"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    netWeight = () => {
        const { gwFrom, gwTo, nwFrom, nwTo } = this.state
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Net Weight</_Text>
                <View style={{ marginTop: hp(1), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(nwFrom) => this.onTextChanged('nwFrom', nwFrom)}
                            value={nwFrom}
                            maxLength={10}
                            placeholder="From"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <_Text fsMedium style={{ marginTop: hp(2) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(nwTo) => this.onTextChanged('nwTo', nwTo)}
                            value={nwTo}
                            maxLength={10}
                            placeholder="To"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    
    productReleaseDate = () => {
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Product Release Between:</_Text>
                <View style={{ marginTop: hp(0.5), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <FromDatePicker
                            dateLabel="From Date"
                            setFromDate={(d) => this.setFromDate(d)}
                            fromDate={this.state.fromDate}
                        />

                    </View>
                    <_Text fsMedium style={{ marginTop: hp(1.5) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        {/* <DatePicker
                            defaultDate={new Date()}
                            // minimumDate={new Date(2018, 1, 1)}
                            //maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            // timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="To Date"
                            textStyle={{ marginTop: hp(0.5), fontSize: 20 }}
                            placeHolderTextStyle={{ color: "gray", fontSize: 20 }}
                            onDateChange={() => this.setToDate()}
                        /> */}
                        <ToDatePicker
                            dateLabel="To Date"
                            setToDate={(d) => this.setToDate(d)}
                            toDate={this.state.toDate}
                        />

                    </View>
                </View>
            </View>
        )
    }


    selectKarat = () => {
        const { selectedKarat,isOkKaratClicked } = this.state

        console.warn("selectedKarat",selectedKarat);
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Melting:</_Text>
                <TouchableOpacity onPress={() => this.karatModal()}>
                    <View style={{
                        marginTop: hp(1), flexDirection: 'row',
                        justifyContent: 'space-between', width: wp(92),
                    }}>
                        {!isOkKaratClicked &&
                            <_Text fsHeading textColor={'gray'} style={{ marginLeft: wp(3) }}>Select Melting:</_Text>
                        }
                        {selectedKarat.length > 0 && isOkKaratClicked &&
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap',  }}>
                                {selectedKarat.map(s => {
                                return <_Text fsHeading style={{ marginLeft: wp(3) }}> {s.value},</_Text>
                            })}
                            </View>
                        }

                        <Image
                            style={{ height: hp(2.5), width: hp(2.5), marginTop: hp(1) }}
                            source={require('../../../assets/image/DownArrow.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    selectCategories = () => {
        const { selectedCategories, isContinueClicked } = this.state
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Select Categories:</_Text>

                {selectedCategories.length > 0 && isContinueClicked &&
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', top: 3, }}>
                        {selectedCategories.length > 0 && <_Text fsPrimary>Selected: </_Text>}
                        {selectedCategories.map(s => {
                            return <_Text fsPrimary> {s.name},</_Text>
                        })}
                    </View>
                }

                <View style={{ marginHorizontal: wp(3), justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.toggleModal()}>
                        <View style={styles.roundedButton}>
                            <View style={styles.buttonText}>
                                <_Text fsHeading bold>SELECT CATEGORIES</_Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    searchButton = () => {
        return (
            <View style={{ marginBottom: hp(4), marginHorizontal: wp(3), justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.searchProducts()}>
                    <View style={styles.roundedButtonSearch}>
                        <View style={styles.buttonText}>
                            <_Text fsHeading bold textColor={'#FFFFFF'}>SEARCH</_Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    continuecategoryModal = () => {
        const{selectedCategories} = this.state

         categoryIds = selectedCategories.map(x => { return x.id})

        this.setState({
            isModalVisible: false,
            isContinueClicked: true
        })
    }

    onOKkaratSelected = () => {
        const{selectedKarat} = this.state

         karatIds = selectedKarat.map(x => { return x.id})
       
        if(selectedKarat.length == 0) {
            this.setState({
                isKaratModalVisible:false
            })
        }else if(selectedKarat.length>0){
            this.setState({
                isKaratModalVisible: false,
                isOkKaratClicked: true
            })
        }
        
    }


    searchProducts = () => {
        const { gwFrom, gwTo, nwFrom, nwTo, fromDate, toDate, selectedCategories, selectedKarat , selectedStatus} = this.state

        if (selectedCategories.length > 0) {

            // var timeStamp = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
            // var timeStampDate = moment(new Date(timeStamp).toISOString().slice(0, 10),).format('DD-MM-YYYY');

            // if (toDate != '' && timeStampDate > toDate) {
            //     alert('Date must be greater than from date');
            // }

            const s = new FormData()

            s.append('table', 'product_master')
            s.append('mode_type', 'filter_data')
            s.append('user_id', userId)
            s.append('record', 10)
            s.append('page_no', 0)
            s.append('collection_ids', categoryIds.toString())
            s.append('sort_by', 2)
            s.append('min_gross_weight', gwFrom ? gwFrom : '')
            s.append('max_gross_weight', gwTo ? gwTo : '')
            s.append('min_net_weight', nwFrom ? nwFrom : '')
            s.append('max_net_weight', nwTo ? nwTo : '')
            s.append('product_status', selectedStatus)
            s.append('melting_id  ', karatIds.toString())
            s.append('created_date_from', fromDate ? fromDate : '')
            s.append('created_date_to', toDate ? toDate : '')

            this.props.searchProducts(s)
        }
        else {
            this.showToast('Please select category')
        }
    }


    searchModal = () => {
        this.setState({ isSearchCodeVisible: !this.state.isSearchCodeVisible });
    };

    handleSearchChange = newText =>
        this.setState({
            searchText: newText,
        });

    searchByCode = () => {
        const{searchText} = this.state
        if(searchText!==''){

            const byCode = new FormData()
             byCode.append("table",'product_master')
             byCode.append("mode_type",'filter_data')
             byCode.append("user_id",userId)
             byCode.append("design_number",searchText)

             this.props.searchByCode(byCode)

            this.setState({
                isSearchCodeVisible: false
            })    
        }
        else{
            this.showToast('please enter design code','danger')
            
            this.setState({
                isSearchCodeVisible: false
            })  
        }
    }

    karatModal = () => {
        this.setState({ isKaratModalVisible: !this.state.isKaratModalVisible, isOkKaratClicked: false });
    };

    filterList(list) {
        return list.filter(listItem =>
            (listItem.melting_name).toLowerCase().includes(this.state.search.toLowerCase()),
        );
    }

    setToggleCheckBox = (id, value) => {

        const { selectedKarat, toggleCheckBox } = this.state

        const val = { ...this.state.karat };
        if (val[id]) {
            val[id] = false;

            var index = selectedKarat.map(x => {
                return x.id;
            }).indexOf(id);

            selectedKarat.splice(index, 1);
        }
        else {
            val[id] = true;

            let array = [];
            let array2 = []
            array = [{ id, value }]
            array2.push(...selectedKarat, ...array);
            this.setState({ selectedKarat: array2 });

        }

        this.setState({ karat: val });

        // this.setState({
        //   toggleCheckBox: val,
        // });
    };

    // setToggleCheckBoxAll = () =>{
    //     const { selectedKarat, toggleCheckBox } = this.state
    //     const { allParameterData} = this.props

    //     const arr = allParameterData && allParameterData.melting

    //     const val = { ...this.state.karat };
        
    //     for(let k = 0; k<arr.length; k++){

    //         val[arr[k].id] = true;

    //         let array = [];
    //         let array2 = []

    //         let id = arr[k].id
    //         let  value = arr[k].melting_name
    //         array = [{ id, value }]
    //         array2.push(...selectedKarat, ...array);
    //         console.warn("array2--==",array2);
    //         this.setState({ selectedKarat: array2 });
       
    //     }
        
    //     this.setState({ karat: val });
    //     console.warn("selectedKarat==",selectedKarat);
    // }


    closeKaratModal = () => {
        this.setState({
            isKaratModalVisible: false,
            isOkKaratClicked: false,
            selectedKarat: [],
        })
        karatIds = []
    }


    setSelectedStatus = value => {
        this.setState({
          selectedStatus: value,
        });
      };


      
    render() {

        const { collection, selectedCategories,selectedKarat,karatData,selectedStatus } = this.state
        const{allParameterData} = this.props

        const list = allParameterData && allParameterData.melting

        let statusArray = [{'id':'1','status':'Available'},{'id':'2','status':'Sold'}]


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3fcf9' }}>
                <_CustomHeader
                    Title={'Search'}
                    RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification-White.png')}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    RightBtnPressTwo={() => this.props.navigation.navigate('Notification')}
                    rightIconHeight2={hp(3.5)}
                    backgroundColor="#19af81"
                />
                <ScrollView>

                    <View style={{ paddingVertical: hp(1.5), justifyContent: 'center', alignItems: 'center' }}>
                        <_Text fsHeading>Code Search:</_Text>
                        <TouchableOpacity onPress={()=>this.searchModal()}>
                            <View style={styles.roundedButton}>
                                <View style={styles.buttonText}>
                                    <_Text fsHeading bold>SEARCH BY CODE</_Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.border} />

                    <_Text fsHeading style={{ textAlign: 'center', marginTop: hp(1.5) }}>Advanced Search:</_Text>

                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.grossWeight()}
                    </View>
                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.netWeight()}
                    </View>

                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.productReleaseDate()}
                        
                    </View>

                    <View style={{ paddingVertical: hp(1.2), marginHorizontal:wp(3)}}>
                    <_Text fsHeading>Product Status:</_Text>
                  <Picker
                    iosIcon={ <Icon name="arrow-down"  style={{ marginRight: hp(3), fontSize: 25, }}/>
                    }
                    mode="dropdown"
                    style={{ height: 45, width: '70%',justifyContent: 'space-between', width: wp(95),marginTop:-5}}
                    selectedValue={this.state.selectedStatus}
                    onValueChange={(value) => this.setSelectedStatus(value)
                    }>
                    {statusArray!=null && statusArray.map(s => (
                      <Picker.Item label={(s.status).toString()} value={parseInt(s.id)} />
                    ))}
                  </Picker>
                </View>


                    <View style={{ paddingVertical: hp(0.2), }}>
                        {this.selectKarat()}
                    </View>

                    <View style={{ paddingVertical: 0,marginTop:5 }}>
                        {this.selectCategories()}
                    </View>

                    <View style={{ paddingVertical: hp(0.5), }}>
                        {this.searchButton()}
                    </View>

                </ScrollView>

                <Modal
                    isVisible={this.state.isModalVisible}
                    transparent={true}
                    onRequestClose={() => this.closeModal()}
                    onBackdropPress={() =>  this.closeModal()}
                    onBackButtonPress={() =>  this.closeModal()}
                  
                    style={{ margin: 28 }}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() =>this.setState({isModalVisible: false,})
                        }>
                        <>
                            <View style={styles.flex}>
                                <View style={styles.selectCategoriesContainer}>
                                    <Text style={styles.selectCategoryText}>
                                        Select Categories
                                  </Text>
                                    <View style={styles.closeIconView}>
                                        <TouchableOpacity
                                            onPress={() => this.closeModal() }>
                                            <Image style={styles.closeIcon} source={IconPack.WHITE_CLOSE} />
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <FlatList
                                    style={{ backgroundColor: '#ffffff' }}
                                    showsVerticalScrollIndicator={false}
                                    data={collection && collection}
                                    renderItem={({ item }) => (
                                        <View style={styles.categoryContainer}>
                                            <Text style={styles.categoryText}>
                                                {item.col_name}
                                            </Text>
                                            <CheckBox
                                                style={styles.checkBox}
                                                tintColors={{ true: '#11255a', false: 'gray' }}
                                                value={this.state.check[item.id]}
                                                onChange={() => this.checkBox_Test(item.id, item.col_name)}
                                                boxType="square"
                                                onFillColor="#11255a"
                                                onTintColor="gray"
                                                onCheckColor="#ffffff"
                                            />
                                        </View>
                                    )}
                                />
                                <View style={styles.buttonContainer}>
                                    <ActionButtonRounded
                                        title="CONTINUE"
                                        onButonPress={() => this.continuecategoryModal()}
                                        containerStyle={styles.buttonStyle}
                                    />
                                </View>
                            </View>
                           
                        </>
                    </TouchableWithoutFeedback>
                </Modal>


                <View style={styles.flex}>
                    <Modal isVisible={this.state.isSearchCodeVisible} 
                      onBackdropPress={() => this.setState({ isSearchCodeVisible: false })}
                      onBackButtonPress={() => this.setState({ isSearchCodeVisible: false })}
                    onRequestClose={()=>this.setState({ isSearchCodeVisible: false })}

                    style={{ margin: 30 }}>
                        <View style={styles.container}>
                            <View style={styles.topContainer}>
                                <Text style={styles.title}>Search By Code</Text>
                            </View>
                            <View style={styles.bottomConatiner}>
                                <View style={styles.flexRow}>
                                    <View style={styles.searchImgView}>
                                        <Image
                                            style={{ height: hp(3.2), width: hp(3.2) }}
                                            source={IconPack.SEARCH_WHITE}
                                        />
                                    </View>

                                    <View style={{ marginRight: 15, flex: 1 }}>
                                        <FloatingLabelTextInput
                                            label="Search"
                                            value={this.state.searchText}
                                            onChangeText={this.handleSearchChange}
                                            resetValue=""
                                            width="100%"
                                        />
                                    </View>
                                </View>
                                <ActionButtonRounded
                                    title="CONTINUE"
                                    onButonPress={() => this.searchByCode()}
                                    containerStyle={styles.buttonStyle}
                                />
                            </View>

                            <TouchableOpacity style={styles.imageView}
                             onPress={() => this.setState({ isSearchCodeVisible: false })}>
                                <Image
                                    source={IconPack.WHITE_CLOSE}
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>


                <Modal
          isVisible={this.state.isKaratModalVisible}
          transparent={true}
          onRequestClose={() => this.closeKaratModal()}
          onBackdropPress={() => this.closeKaratModal()}
          onBackButtonPress={() => this.closeKaratModal()}

          style={{margin: 0}}>
          <TouchableWithoutFeedback >
            <View style={styles.container1}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>Select Melting</Text>
                                <View style={styles.closeIconView}>
                                    <TouchableOpacity
                                        onPress={() => this.closeKaratModal()}>
                                        <Image style={styles.closeIcon} source={IconPack.WHITE_CLOSE} />
                                    </TouchableOpacity>
                                </View>
                            </View>
              <TextInput
                onChangeText={search => this.setState({search})}
                style={styles.searchBar}
                placeholder="Find Melting"
                placeholderTextColor="#757575"
              />
              
              { list && list.length>0 && this.filterList(list).length !== 0 ? (
                this.filterList(list).map((listItem, index) => (
                  <View style={styles.dataContainer}>
                    <Text key={index} style={styles.itemText}>
                      {listItem.melting_name}
                    </Text>

                    <View style={{marginRight: 10}}>
                      <CheckBox
                        disabled={false}
                        value={this.state.karat[listItem.id]}
                        onChange={() => this.setToggleCheckBox(listItem.id,listItem.melting_name)}
                       // onFillColor="#FFFFFF"
                        onFillColor="#11255a"
                        onTintColor="gray"
                        onCheckColor="#ffffff"
                      />
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.noContainView}>
                  <Text style={styles.noFoundText}>No Data found!</Text>
                </View>
              )}
              {/* <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => alert('inprocess')}>
                  <Text style={styles.bottomTxt}>SELECT ALL</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.onOKkaratSelected()}>
                  <Text style={styles.bottomTxt} >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
         */}

                            <View style={[styles.buttonContainer, { marginBottom: hp(1) }]}>
                                <ActionButtonRounded
                                    title="CONTINUE"
                                    onButonPress={() => this.onOKkaratSelected()}
                                    containerStyle={styles.buttonStyle}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
   
            </SafeAreaView>
        );
    }
}


function mapStateToProps(state) {
    return {
        isFetching: state.homePageReducer.isFetching,
        error: state.homePageReducer.error,
        errorMsg: state.homePageReducer.errorMsg,
        successHomePageVersion: state.homePageReducer.successHomePageVersion,
        errorHomePageVersion: state.homePageReducer.errorHomePageVersion,
        homePageData: state.homePageReducer.homePageData,

        isFetchingSearch: state.searchReducer.isFetchingSearch,
        errorSearch: state.searchReducer.errorSearch,
        errorMsgSearch: state.searchReducer.errorMsgSearch,
        successSearchbyCategoryVersion: state.searchReducer.successSearchbyCategoryVersion,
        errorSearchbyCategoryVersion: state.searchReducer.errorSearchbyCategoryVersion,
        searchByCategoryData: state.searchReducer.searchByCategoryData,

        successSearchbyCodeVersion: state.searchReducer.successSearchbyCodeVersion,
        errorSearchbyCodeVersion: state.searchReducer.errorSearchbyCodeVersion,
        searchByCodeData: state.searchReducer.searchByCodeData,

        allParameterData: state.homePageReducer.allParameterData,
        successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
        errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,
    

    };
}

export default connect(mapStateToProps, { searchProducts, searchByCode })(SearchScreen);



const styles = StyleSheet.create({
    border: {
        borderColor: '#DDDDDD',
        borderBottomWidth: 0.8,
        marginTop: hp(1)
    },
    textInputStyle: {
        height: 45,
        width: wp(35),
        borderColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 20
    },
    roundedButton: {
        marginTop: hp(1.5),
        backgroundColor: 'white', height: 50, alignItems: 'center',
        width: wp(85), justifyContent: 'center', borderRadius: 40,
        borderColor: '#fbcb84', borderWidth: 2,
    },
    roundedButtonSearch: {
        marginTop: hp(1.5),
        backgroundColor: color.green, height: 50, alignItems: 'center',
        width: wp(85), justifyContent: 'center', borderRadius: 40,
    },
    buttonText: {
        width: wp(100), height: hp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    flex: {
        flex: 1,
    },
    selectCategoriesContainer: {
        height: 50,
        backgroundColor: color.green,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    selectCategoryText: {
        fontSize: 21,
        fontFamily: 'Helvetica',
        color: '#FFFFFF',
        ...Theme.ffLatoBold20,

    },
    scrollView: {
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        height: 60,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
       // marginBottom:hp(2)
       
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
    flex: {
        flex: 1,
      },
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        borderRadius: 15,
      },
      topContainer: {
        flex: 1,
        backgroundColor: '#19af81',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      bottomConatiner: {
        flex: 3,
        backgroundColor: '#FFFFFF',
        width: '100%',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      title: {
        color: '#FFFFFF',
        ...Theme.ffLatoBold20,
      },
      imageStyle: {
        width: hp(2.5),
        height: hp(2.5),
        resizeMode: 'contain',
      },
      imageView: {
        position: 'absolute',
        top: 16,
        right: 14,
      },
      buttonStyle: {
        marginTop: 10,
        marginBottom: hp(1),
      },
      flexRow: {
        flexDirection: 'row',
        marginTop: 10,
      },
      searchImgView: {
        marginHorizontal: 10,
        marginTop: 8,
        justifyContent: 'center',
      },
    
      flex: {
       // flex: 1,
      },
      titleContainer: {
        //marginLeft: 10,
        backgroundColor:"#19af81",
      },
      titleText: {
        ...Theme.ffLatoBold20,
        color: '#FFFFFF',
        marginLeft: 15,
        marginTop: Platform.OS === 'android' ? 8 : 12,
        marginBottom: Platform.OS === 'android' ? 8 : 12,

      },
      borderStyle: {
        borderBottomColor: '#d2d2d2',
        borderBottomWidth: 1,
      },
      subTitleStyle: {
        ...Theme.ffLatoRegular16,
        color: '#757575',
        marginVertical: 5,
      },
      container1: {
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
              },
      spaceHorizontal: {
        marginHorizontal: 18,
        marginTop: 15,
      },
      searchBar: {
        ...Theme.ffLatoRegular14,
        margin: 10,
        height: 38,
        backgroundColor: 'white',
        borderColor: '#d2d2d2',
        borderWidth: 1,
        //marginLeft: 7,
      },
      itemText: {
        margin: 1,
       // color: '#FFFFFF',
       
        ...Theme.ffLatoBold15,
        //backgroundColor: '#657fd6',
        height: 45,
        padding: 12,
      },
      bottomView: {
        height: 45,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
      },
      bottomTxt: {
        ...Theme.ffLatoRegular13,
        color: '#000000',
      },
      dataContainer: {
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#657fd6',
        borderBottomColor: '#d2d2d2',
        borderBottomWidth: 1,
        alignItems: 'center',
      },
      noContainView: {
        height: 35,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      noFoundText: {
        ...Theme.ffLatoRegular18,
        color: 'red',
        letterSpacing: 0.7,
      },
    
});

///--------------------------------ActionButton------------------
const ActionButtonRounded = ({ title, onButonPress, containerStyle, }) => {
    return (
        <TouchableOpacity
            onPress={() => { onButonPress() }}>
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
        backgroundColor: color.green,
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
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '400',
    },
});
