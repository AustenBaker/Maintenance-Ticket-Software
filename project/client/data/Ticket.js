import * as React from 'react';
import { View, CheckBox, Button, Text, Picker } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
import User from './User.js';
import { TextInput } from 'react-native-gesture-handler';
import { TicketStore } from '../stores';

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
      ticket_edit_mode: props.ticket_edit_mode,
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
    ticket_edit_mode: false,
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
    if (this.emergency === true){
      emergency = (
        <Text testID="emergency">
          URGENT: This is an emergency level ticket!
        </Text>
      );
    }else{
      emergency = (
        <Text testID="emergency">
          This is a normal level ticket
        </Text>
      );
    }

    //ticket details content
    //TODO make edit button open up edit view
    content = (
      <View>
        <Text testID="ticket_number">
          Ticket Number: {this.state.ticket_number}
        </Text>

        <Text testID="unit_number">
          Unit Number: {this.state.unit_number}
        </Text>

        <Text testID="status">
          Ticket Status: {this.state.status}
        </Text>

        <Text testID="timestamp">
          Location: {this.state.timestamp}
        </Text>

        <Text testID="location">
          Location: {this.state.location}
        </Text>

        {emergency}

        <Button
          title="Edit Ticket"
          onPress={() => {
            this.setState(ticket_edit_mode, true);
          }}
          accessibilityLabel="Edit Ticket Button"
        />

      </View>
    );
    return content;
  }

  //generate ticket list using flatlist
  generateTicketList = () => {

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
    if('emergency' in props){
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

    const ticket = this.getTicket();

    let editable = this.state.ticket_edit_mode;
    var submitButton;
    if(editable = true) {
      submitButton = (<Button
        title="submit ticket update"
      />)
    }

    //the content that will be returned
    content = (
      <View>


        <Text>Property</Text>
        <Picker
          selectedValue={this.state.location}
          style={{ hieght: 50, width: 200}}
          onValueChange={
            (itemValue, itemIndex) => this.setState({location: itemValue})
          }
        >
          <Picker.Item label={CONSTANTS.PROPERTY[0]} value={CONSTANTS.PROPERTY[0]} />
          <Picker.Item label={CONSTANTS.PROPERTY[1]} value={CONSTANTS.PROPERTY[1]} />
          <Picker.Item label={CONSTANTS.PROPERTY[2]} value={CONSTANTS.PROPERTY[2]} />
          <Picker.Item label={CONSTANTS.PROPERTY[3]} value={CONSTANTS.PROPERTY[3]} />
          <Picker.Item label={CONSTANTS.PROPERTY[4]} value={CONSTANTS.PROPERTY[4]} />
          <Picker.Item label={CONSTANTS.PROPERTY[5]} value={CONSTANTS.PROPERTY[5]} />
        </Picker>

        <TextInput
          label="Unit Number"
          placeholder={this.state.unit_number}
          maxLength={4}
          selectTextOnFocus={true}
          errorMessage="Unit Number is required"
          onChangeText={unitn => this.setState(unit_number, unitn)}
        />


        <Text>Is this an emergency?</Text>
        <Picker
          selectedValue={this.state.emergency}
          style={{ height: 50, width: 50 }}
          onValueChange={
            (itemValue, itemIndex) => this.setState({emergency: itemValue})
          }
        >
          <Picker.Item label='NO'  value={CONSTANTS.EMERGENCY.NO}  />
          <Picker.Item label='YES' value={CONSTANTS.EMERGENCY.YES} />
        </Picker>


        <Text>Ticket Status (Open/Closed):</Text>
        <Picker
          selectedValue={this.state.status}
          style={{ height: 50, width: 150 }}
          onValueChange={
            (itemValue, itemIndex) => this.setState({status: itemValue})
          }
        >
          <Picker.Item label='Open'  value={CONSTANTS.STATUS.OPEN}   />
          <Picker.Item label='Closed'value={CONSTANTS.STATUS.CLOSED} />
        </Picker>

      </View>
    );


    return content;
  }


  /**
   * Create ticket method
   * User selects which unit (Picker)
   * Checkbox with common problems & other textbox
   * emergency level (radio button)
   * If switched to emergency, display warning
   */
  createTicket = () => {

  }

  /**
   * boolean change ticket status
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
   */
  deleteTicket = () => {

  }

  //returns a ticket
  getTicket = () => {
    let ticket = {
      ticket_number: this.state.ticket_number,
      timestamp: this.state.timestamp,
      status: this.state.status,
      location: this.state.location,
      unit_number: this.state.unit_number,
      email: this.state.email,
      emergency: this.state.emergency,
      ticket_edit_mode: this.state.ticket_edit_mode,
      ticket_updates: [...this.state.ticket_updates]
    }
    return ticket;
  }


  //method to delete tickets for management

  render = () => {
    var content;

    //normal view
    if (this.state.ticket_edit_mode === false) {
      content = this.displayTicketDetails();
    }
    //ticket edit mode view
    else {
      content = this.editTicket();
    }
    return (content);
  }

}
