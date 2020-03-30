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
    ticket_updates: []
  }

  /**
   * This method displays tickets
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
        <Text>
        </Text>
      </View>
    );
    return content;
  }

  update = (props) => {
    var updated = false;

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

        <FormLabel>Ticket Level:</FormLabel>
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




      </form>
    );
    return content;
  }


}