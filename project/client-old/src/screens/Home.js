import React from 'react';
import { SafeAreaView, View, FlatList, Text } from 'react-native';

export default class Home extends React.Component{
  render() {
    return (
      <text>temp</text>
    );
  }
}

// placeholder example
const TICKETS = [
    {
         id: '0001',
         unit: '203',
         user: 'john.doe@gmail.com',
         category: 'plumbing',
         description: 'Leaky faucet',
         timestamp: '03/07/2020 15:03',
         emergency: 'false',
    },
];
