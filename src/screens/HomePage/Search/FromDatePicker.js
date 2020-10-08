import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';




export default class FromDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      // date:moment(new Date().toISOString().slice(0, 10)).format('DD-MM-YYYY')
    };
  }

  showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true,
    });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
    });
  };

  handleDatePicked(date) {
    let d = moment(new Date(date).toISOString().slice(0, 10)).format('DD-MM-YYYY');

    this.setState({
      date: d,
      isDateTimePickerVisible: false,
    });
    this.props.setFromDate(d)
  }

  render() {
    const { isDateTimePickerVisible, date } = this.state

    return (
      <View style={styles.container}>

        <View
          style={{
            flexDirection: 'row',
            marginright: 0,
          }}>

          <View
            style={{
              marginTop: 5,
              borderColor: 'gray',
              borderBottomWidth: 1,
              width: wp(35),
              height: 40,
            }}>
            <TouchableOpacity
              onPress={() => this.showDateTimePicker()}>
              {this.props.fromDate != '' &&
                <Text style={styles.textDatePickerStyle}> {this.props.fromDate}</Text>}

              {this.props.fromDate == '' && <Text style={styles.textDatePickerStyle2}>{' From Date'}</Text>}

            </TouchableOpacity>
          </View>
        </View>

        {isDateTimePickerVisible && (
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={date => this.handleDatePicked(date)}
            onCancel={() => this.hideDateTimePicker()}
          />
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  textDatePickerStyle2: {
    color: 'gray',
    marginTop: 5,
    fontSize: 18,
  },
  textDatePickerStyle: {
    color: '#000000',
    marginTop: 5,
    fontSize: 18,
  }

});
