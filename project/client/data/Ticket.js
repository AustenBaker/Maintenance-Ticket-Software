import * as React from 'react';
import { View,  Button, Text, Picker, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
import User from './User.js';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { userStore, ticketStore } from '../stores';

/**
 * TODO: make ticket_number a GUID?
 * ticket status holds the value which says a ticket is open(0) or closed(1) or deleted(2)
 * emergency boolean
 */
//TODO: make ticket_number a GUID?
//ticket status holds the value which says a ticket is open(0) or closed(1) or deleted(2)
export default class Ticket extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ticket_number: props.ticket_number,
      timestamp: props.timestamp,
      status: props.status,
      location: props.location,
      unit_number: props.unit_number,
      email: props.email,
      emergency: props.emergency,
      ticket_issue_title: props.ticket_issue_title,
      ticket_issue: props.ticket_issue,
      ticket_view_mode: props.ticket_view_mode,
      ticket_updates: [props.ticket_updates]
    }
  }

  /**
   * Declare default values for Ticket props
   */
  static defaultProps = {
    ticket_number: "99999",
    timestamp: "",
    status: CONSTANTS.STATUS.OPEN,
    location: CONSTANTS.PROPERTY.WSP,
    unit_number: "316",
    email: "email@email.com",
    emergency: false,
    ticket_issue_title: "Pipe Burst",
    ticket_issue: "A pipe burst open in my bathroom",
    ticket_view_mode: 0,
    ticket_updates: []
  }

  

  /**
   * This method displays ticket details like an expanded view
   * emergency level, ticket number, unit number, status
   * display list of tickets
   * this should be called when a ticket from the list is pressed
   */
  displayTicketDetails = (props) => {
    var content;

    // create <Text> container for emergency data
    var emergency = "";
    if (this.state.emergency === CONSTANTS.EMERGENCY.YES){
      emergency = (
        <Text testID="emergency">
          Level: EMERGENCY
        </Text>
      );
    }else{
      emergency = (
        <Text testID="emergency">
          Level: Normal
        </Text>
      );
    }

    // create <Text> container for status
    var status = "";
    if (this.state.status === CONSTANTS.STATUS.OPEN){
      status = ( 
        <Text testID="status">Status: Open</Text>
      );
    } else { 
      status = ( 
        <Text testID="status">Status: Closed</Text>
      );
    }

    //<text> for ticket_number
    var ticket_number = "";
    ticket_number = (
      <Text testID="ticket_number">
        Ticket ID #{this.state.ticket_number}
      </Text>
    );
  
    
    //<view> for ticket
    var ticket = "";
    ticket = (
      <View testID="ticketContainer" style={styles.ticketContainer}>
          <Text style={styles.ticketHeader}>
            <View testID = "unit_number">
              <Text style={styles.ticketHeader}>Location: Apt. {this.state.unit_number}, </Text>
            </View>
            <View testID = "location">
              {this.state.location} {"\n"}
            </View>
          </Text>

          <Text style={styles.ticketBody}>
            {status}  {"\n"}
          </Text>

          <View testID="emergency">
            {emergency} {"\n"}
          </View>

          <View>
            {ticket_number}  {"\n"}  
          </View>

          <View testID="timestamp">
            Timestamp: {this.state.timestamp}
          </View>

          <View>
            {this.ticket_issue_title}
            {this.ticket_issue}  
          </View>

        </View>
    );


    //<view> for buttons
    var buttons = "";
    buttons = (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.editTicketButton}>
            <Button
              title="Edit Ticket"
              onPress={() => {
                this.setState({ticket_view_mode: 1});
              }}
              accessibilityLabel="Edit Ticket Button"
            />
          </View>
        
          <View style={styles.showTicketListButton}>
            <Button
              title="Show Ticket List"
              onPress={() => {
                this.setState({ticket_view_mode: 2});
              }}
              accessibilityLabel="Edit Ticket Button"
            />
          </View>
        </View>
    );
    //ticket details content
    content = (
      <View>{ticket}{buttons}</View>
    );
    return content;
  }

  //generate ticket list using flatlist
  generateTicketList = () => {
    var content;
    var temp = this.displayTicketDetails();

    content = (
      <View>
        <ScrollView>
          <Text style={{backgroundColor: 'white', height: 400, margin: 20}}>
            in progress
          </Text>
          <Text style={{backgroundColor: 'white', height: 300, margin: 20}}>
            in progress
          </Text>
          <Text style={{backgroundColor: 'white', height: 200, margin: 20}}>
            in progress
          </Text>
          <Text style={{backgroundColor: 'white', height: 100, margin: 20}}>
            in progress
          </Text>

          <Button
              title="Back"
              onPress={() => {
                this.setState({ticket_view_mode: 0});
              }}
              accessibilityLabel="Edit Ticket Button"
            />
        </ScrollView>
      </View>
    );
    return content;
  }

  /**
   * This method updates ticket information
   *
   * @param ticket_number Ticket number/id
   * @param emergency Ticket level
   * @param unit Ticket unit number
   * @param status Ticket status
   *
   * @returns true if updated correctly
   */
  update = (props) => {
    var updated = false;
    var checked = [];
    if('ticket_number' in props){
      checked.push({['ticket_number']: props.ticket_number});
    }
    if('status' in props && props.status in CONSTANTS.STATUS){
	    checked.push({['status']: props.status});
    }
    if('location' in props && props.location in CONSTANTS.PROPERTY){
      checked.push({['location']: props.location});
    }
    if('emergency' in props && props.emergency in CONSTANTS.EMERGENCY){
	    checked.push({['emergency']: props.emergency});
    }
    if('unit_number' in props){
	    checked.push({['unit_number']: props.unit_number});
    }
    //TODO: update server state and this.setState
    return updated;
  }

  /**
   * TODO: UPDATE
   *       add emergency warning
   *
   * Generates form to display when editing a ticket
   *
   * includes the following fields:
   * Unit Number(text input),
   * Emergency(Picker YES NO)
   * Ticket Status(Picker Open Closed)
   */
  editTicket = () => {
    //content for return
    var content;

    var ticket = this.getTicket();

    //the content that will be returned
    content = (
      <View>

        <Picker mode="dropdown"
          selectedValue={ticket.location}
          style={styles.editTicketPicker}
          onValueChange={
            (itemValue, itemIndex) => this.setState({location: itemValue})
          }
        >
          <Picker.Item label={CONSTANTS.PROPERTY.WSP} value={CONSTANTS.PROPERTY.WSP} />
          <Picker.Item label={CONSTANTS.PROPERTY.RH}  value={CONSTANTS.PROPERTY.RH} />
          <Picker.Item label={CONSTANTS.PROPERTY.SA}  value={CONSTANTS.PROPERTY.SA} />
          <Picker.Item label={CONSTANTS.PROPERTY.LAA} value={CONSTANTS.PROPERTY.LAA} />
          <Picker.Item label={CONSTANTS.PROPERTY.TAW} value={CONSTANTS.PROPERTY.TAW} />
        </Picker>
        
        <TextInput
          placeholder="Unit Number (type in box)"
          style={styles.editTicketTextInput}
          maxLength={5}
          onChangeText={
            input => this.setState({unit_number: input})
          }
        />

        <Picker mode="dropdown"
          selectedValue={ticket.status}
          style={styles.editTicketPicker}
          onValueChange={
            (itemValue, itemIndex) => this.setState({status: itemValue})
          }
        >
          <Picker.Item label={CONSTANTS.STATUS.OPEN}   value={CONSTANTS.STATUS.OPEN}   />
          <Picker.Item label={CONSTANTS.STATUS.CLOSED} value={CONSTANTS.STATUS.CLOSED} />
        </Picker>

        <Picker mode="dropdown"
          selectedValue={ticket.emergency}
          style={styles.editTicketPicker}
          onValueChange={
            (itemValue, itemIndex) => this.setState({emergency: itemValue})
          }
        >
          <Picker.Item label={CONSTANTS.EMERGENCY.NO}  value={CONSTANTS.EMERGENCY.NO}  />
          <Picker.Item label={CONSTANTS.EMERGENCY.YES} value={CONSTANTS.EMERGENCY.YES} />
        </Picker>

        <View style={styles.submitTicketUpdateButton}>
          <Button
            title="Submit Ticket Update"
            onPress={() => {
              this.setState({ticket_view_mode: 0});
            }}
            accessibilityLabel="Submit Ticket Update Button"
          />
        </View>

      </View>
    );


    return content;
  }

  //returns a ticket object
  getTicket = () => {
    let ticket = {
      ticket_number: this.state.ticket_number,
      timestamp: this.state.timestamp,
      status: this.state.status,
      location: this.state.location,
      unit_number: this.state.unit_number,
      email: this.state.email,
      emergency: this.state.emergency,
      ticket_view_mode: this.state.ticket_view_mode,
      ticket_updates: [...this.state.ticket_updates]
    }
    return ticket;
  }

  /**
   * boolean change ticket status
   * note: Do i need this if can change 
   * with picker in edit ticket view
   */
  closeTicket = (props) => {
    let success = false;
    this.setState({status: CONSTANTS.STATUS.CLOSED});
    if(this.state.status === CONSTANTS.STATUS.CLOSED){
      success = true;
    }
    return success;
  }

  /**
   * Delete ticket method
   * for management and maint accounts
   */
  deleteTicket = () => {}

  render = () => {
    var content;

    //0 == display single ticket details
    if (this.state.ticket_view_mode === 0) {
      content = this.displayTicketDetails();
    }

    //1 === ticket edit
    else if (this.state.ticket_view_mode === 1){
      content = this.editTicket();
    } 
    //2 === ticketlist
    else if (this.state.ticket_view_mode === 2){
      content = this.generateTicketList();
    }
    return (content);
  }

}

const styles = StyleSheet.create({
  //ticket view screen styles
  ticketContainer: {
    height: 200, 
    width: '80%',
    marginLeft: '10%',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'white', 
    textAlign: 'left',
    borderRadius: 12,

  },
  ticketHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  ticketBody: {
    fontSize: 18,
  },

  editTicketButton: {
    width: '30%',
  },
  showTicketListButton: {
    width: '30%',
  },

  //edit view screen styles
  editTicketPicker: {
    height: 50,
    width: '80%',
    fontSize: 20,
    margin: 20,
    alignSelf: 'center',
  },
  editTicketTextInput: {
    height: 50,
    width: '80%',
    marginLeft: '10%',
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  submitTicketUpdateButton: {
    width: '30%',
    alignSelf: 'center',
  },

  //ticket list styles

});