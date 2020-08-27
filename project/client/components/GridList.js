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
          onPress={() => {
            alert("TO DO: navigate to single ticket detail page")
          }}
        >
          <Text style={styles.headerText}>
            Property: {item.aptComplex} Unit: {item.unit}
          </Text>
          <View style={{ borderBottomColor: '#52575d', borderBottomWidth: 6,}}/> 
          <Text style={styles.bodyText}>
            Reason for ticket (issue): {item.issue}
          </Text>
        </TouchableOpacity>

        <View style={styles.updateTicketButtonContainer}>
          <Text style={styles.footerText}>
            Ticket ID Number: {item.id}
            {'\n'}
          </Text>
          <TouchableOpacity 
            style={styles.updateTicketButton}
            onPress={() => {
              alert("TO DO: move this full ticket detail page")
            }}
            accessibilityLabel="Update Ticket Button"
          >
            <Text style={{fontSize:18, fontWeight: 'bold'}}>Update Ticket</Text>
          </TouchableOpacity>
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
    backgroundColor: '#f6f4e6',
    borderColor: '#52575d',
    borderWidth: 6,
    borderRadius: 10,
    margin: 3,
    padding: 2,
  },

  bodyContainer: {
    flex: 2,
  },

  headerText: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '600',
    margin: 5,
  },

  bodyText: {
    fontSize: 18,
    fontWeight: '300'
  },

  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },

  itemInvisible: {
    backgroundColor: 'black',
  },

  updateTicketButtonContainer: {
  },

  updateTicketButton: {
    height: 30,
    width: 150,
    backgroundColor: "#fddb3a",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#52575d',
    alignSelf: 'flex-end'
  },

});