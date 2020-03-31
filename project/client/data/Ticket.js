import * as React from 'react';
import { View, CheckBox, FormInput } from 'react-native';

export default class Ticket extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ticket_number: props.ticket_number,
      emergency: props.emergency,
      unit: props.unit,
      user: props.user,
      status: props.status,
      edit_mode: props.edit_mode,
      ticket_updates: [props.ticket_updates]
    }
  }

  /**
   * Declare default values for Ticket props
   */
  static defaultProps = {
    ticket_number: "999",
    emergency: true,
    unit: "316",
    user: "John Doe",
    status: "in-progress",
    edit_mode: "false",
    ticket_updates: []
  }

  
  /**
   * This method displays tickets
   * emergency level, ticket number, unit number, status
   * 
   */
  displayTicket = () => {
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
          {this.ticket_number}
          Unit Number:
          {this.unit}
          Status:
          {this.status}
        </Text>
          {emergency}
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
   * @param user User who created ticket
   * @param status Ticket status
   * 
   * @returns true if updated correctly
   */
  update = (props) => {
    var updated = false;
    var checked = [];
    if('ticket_number' in props){
      checked = [{ticket_number: props.ticket_number}];
    }
    if('emergency' in props){
      checked = [...checked, {emergency: props.emergency}];
    }
    if('unit' in props){
      checked = [...checked, {unit: props.unit}];
    }
    if('user' in props){
      checked = [...checked, {user: props.user}];
    }
    if('status' in props){
      checked = [...checked, {status: props.status}];
    }

    //update server state and this.setState
    return updated;
  }

  /**
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
        <FormInput>
          <CheckBox
            title='Emergency'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={emergency === true}
            onIconPress={emergency = true}
          />
          <CheckBox
            title='Normal'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={emergency === false}
            onIconPress={emergency = false}
          />
          <CheckBox
            title='Low'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={emergency === false}
            onIconPress={emergency = false}
          />
        </FormInput>
        <FormValidationMessage>{'This field is required.'}</FormValidationMessage>

        <FormLabel>Ticket Status:</FormLabel>
        <FormInput>
          <CheckBox
            title='Open'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={status === 'open'}
            onIconPress={status = 'open'}
          />
          <CheckBox
            title='In-Progress'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={status === 'in-progress'}
            onIconPress={status = 'in-progress'}
          />
          <CheckBox
            title='Closed'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={status === 'closed'}
            onIconPress={status = 'closed'}
          />
        </FormInput>
        <FormValidationMessage>{'This field is required.'}</FormValidationMessage>

      </form>
    );
    return content;
  }


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