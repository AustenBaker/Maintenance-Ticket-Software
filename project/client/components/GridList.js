import React, { useState } from 'react';
import { Text, Image, View, Button, StyleSheet, 
         FlatList, TouchableOpacity, Dimensions,
        } from 'react-native';
import ticketData from '../assets/ticketData';

const WIDTH = Dimensions.get('window').width * 0.9;
const HEIGHT = Dimensions.get('window').height;
const numColumns = 2;
const numRows = 5;
var data = require('../assets/ticketData').data;

export default function GridList() {

  const fortmatData = (data, numColumns) => {
    const totalRows = Math.floor(data.length / numColumns)
    let totalLastRow = data.length - (totalRows * numColumns)
    while (totalLastRow !== 0 && totalLastRow !== numColumns){
      data.push({ blank: 'blank', empty: true})
      totalLastRow++
    }
    return data
  }



  const renderItem = ({item, index}) => {
    if (item.empty) {
      return (
        <View style={[ styles.itemContainer, styles.itemInvisible ]}/>
      )
    } else { 
      return (
       <View style={styles.itemContainer}>
        <TouchableOpacity 
        style={styles.bodyContainer}
        onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text>
            ID: {item.id} {'\n'}
            Property: {item.aptComplex}{'\n'}
            Unit: {item.unit}
          </Text>
        </TouchableOpacity>
        <View style={styles.editTicketButtonContainer}>
          <Button
            title="Update Ticket"
            color="grey"
            onPress={() => {
              alert("TO DO")
            }}
            accessibilityLabel="Update Ticket Button"
          />
        </View>
      </View>
      )
    }
  }

  return (
      <FlatList 
        data={fortmatData(data, numColumns)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    width: WIDTH/numColumns,
    height: HEIGHT/numRows,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 5,
    margin: 3,
    padding: 2,
  },

  bodyContainer: {
    flex: 2,
  },

  itemInvisible: {
    backgroundColor: 'black',
  },

  editTicketButtonContainer: {
    flex: 1,
    width: '20%',
    backgroundColor: 'grey',
  },

});