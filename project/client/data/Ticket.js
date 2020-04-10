import * as React from 'react';
import { View, CheckBox, Picker, FormInput } from 'react-native';
import * as CONSTANTS from '../constants/Reference';

export default class Ticket extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ticket_number: props.ticket_number,
      emergency: props.emergency,
      unit: props.unit,
      first_name: props.first_name,
      last_name: props.last_name,
      status: props.status,
      edit_mode: props.edit_mode,
      ticket_updates: [props.ticket_updates]
    }
  }

  /**
   * Declare default values for Ticket props
   */
  static defaultProps = {
    ticket_number: "99999",
    emergency: true,
    unit: "316",
    first_name: "FirstName",
    last_name: "LastName",
    status: "in-progress",
    edit_mode: "false",
    ticket_updates: []
  }

  //method to create ticket
  createTicket = () => {
	  
  }
  
  
  
  
  /**
   * This method displays tickets
   * emergency level, ticket number, unit number, status
   * display list of tickets
   * this should be called when a ticket from the list is pressed
   */
  displayTicketDetails = () => {
    var content;

    // create <Text> container for emergency data
    var emergency = "";
    if (this.emergency === true){
      emergency = (
        <Text>
          URGENT: This is an emergency level ticket!
        </Text>
      );
    }else{
      emergency = NULL;
    }

    //prepare content
    content = (
      <View>
        <Text>
          Ticket Number:
          {this.state.ticket_number}
          Unit Number:
          {this.state.unit}
          Status:
          {this.state.status}
        </Text>
        {emergency}
		//TODO add edit button
      </View>
    );
    return content;
  }
  
  //display ticket list using flatlist

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
    if('emergency' in props){
	  checked.push({['emergency']: props.emergency});
    }
    if('unit' in props){
	  checked.push({['unit']: props.unit});
    }
    if('status' in props){
	  checked.push({['status']: props.status});
    }

    //TODO: update server state and this.setState
    return updated;
  }

  /**
   * TODO: UPDATE
   * Generates form to display when editing a ticket
   * so far includes:
   * Ticket Number, Unit Number, Emergency/Ticket Level Checkbox,
   * Ticket Status Checkbox,  
   */
  editTicket = () => {
    var content;
    content = (
      <form name = "editTicket">
        <FormLabel>Ticket Number</FormLabel>
        <FormInput>
          onSubmitEditing={new_ticket_number => this.setState(ticket_number, new_ticket_number)}
          defaultValue={this.state.ticket_number}
        </FormInput>
        <FormValidationMessage>{'This field is required.'}</FormValidationMessage>

        <FormLabel>Unit Number</FormLabel>
        <FormInput>
          onSubmitEditing={newUnit => this.setState(unit, newUnit)}
          defaultValue={this.state.unit}
        </FormInput>
        <FormValidationMessage>{'This field is required.'}</FormValidationMessage>

        <FormLabel>Ticket Importance Level:</FormLabel>
        <Picker>
          <Picker
            title='Emergency'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={emergency === true}
            onIconPress={emergency = true}
          />
          <Picker.Item
            label='Normal'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={emergency === false}
            onIconPress={emergency = false}
          />
          <P
            label='Low'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={emergency === false}
            onIconPress={emergency = false}
          />
        </Picker>
        <FormValidationMessage>{'This field is required.'}</FormValidationMessage>

        <FormLabel>Ticket Status:</FormLabel>
        <Picker>
          <Picker.Item
            title='Open'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={status === 'open'}
            onIconPress={status = 'open'}
          />
          <Picker.Item
            title='In-Progress'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={status === 'in-progress'}
            onIconPress={status = 'in-progress'}
          />
          <Picker.Item
            title='Closed'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={status === 'closed'}
            onIconPress={status = 'closed'}
          />
        </Picker>
        <FormValidationMessage>{'This field is required.'}</FormValidationMessage>

      </form>
    );
    return content;
  }
  
  //create a close ticket method
  //method to delete tickets for management

  render = () => {
    var content;
    if(this.state.editMode === false){
      content = this.displayTicket();
    }else{
      content = this.editUser();
    }
    return (content);
  }

}