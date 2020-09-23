//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// create a component
class _FlatList extends Component {

    render() {

        const { isHorizontal, data, isShowsHorizontalScrollIndicator, componentToRenderItem, keyExtractorId } = this.props



        return (
            <View>
                <FlatList
                    data={data}
                    isHorizontal={isHorizontal}
                    showsHorizontalScrollIndicator={isShowsHorizontalScrollIndicator}
                    renderItem={({ item, index }) => componentToRenderItem
                    }

                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default _FlatList;
