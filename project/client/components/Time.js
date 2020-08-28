import React, { useState } from 'react';
import {Text, View} from 'react-native';

const CurrentDate = (props) => {
  return(
    <View style={{alignSelf: 'center'}}>
      <Text style={{fontSize: 24, color: 'red', alignSelf: 'center', padding: 5}}>
        Current Date: {props.date}
      </Text>
    </View>
  );
};

class Time extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <CurrentDate date={Date()} />
      </div>
    );
  }
}

export default Time;