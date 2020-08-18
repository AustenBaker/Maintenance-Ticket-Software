import * as React from 'react';
import { View,  Button, Text, Picker, StyleSheet, FlatList, SectionList, TouchableWithoutFeedbackBase } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
import User from './User.js';
import { TextInput, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { userStore, ticketStore } from '../stores';
import { getTicketsFromEmail } from '../fetch/user';
import gridList from '../components/GridList';
import GridList from '../components/GridList';


export default class Ticket extends React.Component{
  User
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {...Ticket.defaultProps};
    for (let key in props) {
      if (key in this.state) {
          this.state[key] = props[key];
      }
    }
  }

  /**
   * Declare default values for Ticket props
   */
  static defaultProps = {
    id: null,
    email: null,
    aptComplex: null,
    unit: null,
    issue: null,
    emergency: null,
    resolvedTime: null,
    progress: null,
    closed: null,
    ticket_view_mode: CONSTANTS.TICKET_VIEW.LIST,
  }


  /**
   * This method displays ticket details like an expanded view
   * emergency level, ticket number, unit number, status
   * display list of tickets
   * this should be called when a ticket from the list is pressed
   */
  displayTicketDetails = () => {
    var content;
    let profile = [];
    for (let key in this.state) {
      profile.push[key] = this.state[key];
    }
    //************TicketDetailsView*****************
    content = (
      <View>
        <View style={styles.tempButtonStyle}>
          <Button
            title="List View"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.LIST});
            }}
          />
          <Button
            title="Update Ticket Option"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.UPDATE});
            }}
            accessibilityLabel="Update Ticket Button"
          />
        </View>

        <View testID="ticketContainer" style={styles.ticketDetailsContainer}>
          <Text style={styles.ticketDetailsBody}>
            id: {profile['id']} {"\n"}
            email: {this.state.email} {"\n"}
            aptComplex: {this.state.aptComplex} {"\n"}
            unit: {this.state.unit} {"\n"}
            issue: {this.state.issue} {"\n"}
            emergency: {this.state.emergency} {"\n"}
            resolvedTime: {this.state.resolvedTime} {"\n"}
            progress: {this.state.progress} {"\n"}
            closed: {this.state.closed} {"\n"}
          </Text>
        </View>
      </View>
    );
    return content;
  }

  gridList = () => {
    var content;

    content = (
      <ScrollView>
        <View style={styles.tempButtonStyle}>
          <Button
            title="Single Ticket Full View"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.DETAIL});
            }}
          />
          <Button
            title="Update Ticket Option"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.UPDATE});
            }}
            accessibilityLabel="Update Ticket Button"
          />
        </View>

        <GridList />
      </ScrollView>
    );

    return content;
  }

  updateTicket = () => {
    //content for return
    var content;

    //the content that will be returned
    content = (
      <View>

        <Picker mode="dropdown"
          style={styles.editTicketPicker}
          onValueChange={
            (itemValue, itemIndex) => this.setState({emergency: itemValue})
          }
        >
          <Picker.Item label={CONSTANTS.EMERGENCY.NO}  value={CONSTANTS.EMERGENCY.NO}  />
          <Picker.Item label={CONSTANTS.EMERGENCY.YES} value={CONSTANTS.EMERGENCY.YES} />
        </Picker>

        <Picker mode="dropdown"
          style={styles.editTicketPicker}
          onValueChange={
            (itemValue, itemIndex) => this.setState({closed: itemValue})
          }
        >
          <Picker.Item label={CONSTANTS.STATUS.OPEN}   value={CONSTANTS.STATUS.OPEN}   />
          <Picker.Item label={CONSTANTS.STATUS.CLOSED} value={CONSTANTS.STATUS.CLOSED} />
        </Picker>

        <View style={styles.tempButtonStyle}>
          <Button
            title="Submit Ticket Update"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.DETAIL});
            }}
            accessibilityLabel="Submit Ticket Update Button"
          />
        </View>

      </View>
    );
    return content;
  }

  render = () => {
    var content;

    //display single ticket details
    if (this.state.ticket_view_mode === CONSTANTS.TICKET_VIEW.DETAIL) {
      content = this.displayTicketDetails();
    }

    //ticket edit
    else if (this.state.ticket_view_mode === CONSTANTS.TICKET_VIEW.UPDATE){
      content = this.updateTicket();
    }
    //ticketlist
    else if (this.state.ticket_view_mode === CONSTANTS.TICKET_VIEW.LIST){
      content = this.gridList();
    }
    return (content);
  }
}

const styles = StyleSheet.create({
  //ticket details view screen styles
  ticketDetailsContainer: {
    height: '100%',
    width: '80%',
    marginLeft: '10%',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'white',
    //textAlign: 'left', // invalid parameter  alignContent: 'flex-start',
    borderRadius: 12,
  },
  ticketDetailsBody: {
    fontSize: 16,
    lineHeight: 32,
  },
  editTicketButton: {
    width: '20%',
    backgroundColor: 'grey',
  },
  generateTicketListButton: {
    width: 400,
  },

  //edit view screen styles
  editTicketPicker: {
    height: 50,
    width: '90%',
    margin: 10,
    alignSelf: 'center',
  },
  editTicketTextInput: {
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  tempButtonStyle: {
    width: 400,
    alignSelf: 'center',

  },

  //simple ticket view styles
  simpleTicketContainer: {
    height: 200,
    width: '90%',
    marginLeft: '5%',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
  },

  //ticket list styles
  ticketListContainer: {
    flex: 1,
  },
  ticketListItem1: {
    flex: 1,
    color: 'red',
  },
  ticketListItem2: {
    flex: 1,
    color: 'blue',
  },
  ticketListItem3: {
    flex: 1,
    color: 'red',
  },
  ticketListItem4: {
    flex: 1,
    color: 'blue',
  },

  // simpler color alternation:

  ticketColorBarRed: {
      flex: 1,
      color: 'red'
  },
  ticketColorBarBlue: {
    flex: 1,
    color: 'blue'
  }

});
