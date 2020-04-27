import * as React from 'react';
import { View,  Button, Text, Picker, StyleSheet, FlatList, SectionList, TouchableWithoutFeedbackBase } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
import User from './User.js';
import { TextInput, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { userStore, ticketStore } from '../stores';
import { getTicketsFromEmail } from '../fetch/user';

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
      ticket_updates: [...props.ticket_updates]
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
    ticket_view_mode: 0,
    ticket_updates: [] // {timestamp,user,data}
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
    if (this.state.emergency){
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

    //ticket details content
    content = (
      <View>

        <View testID="ticketContainer" style={styles.ticketContainer}>
          <Text style={styles.ticketLine1}>
            Location: Apt. {this.state.unit_number}, {this.state.location} {"\n"}
          </Text>

          <Text style={styles.ticketLine2}>
            {status}  |  {emergency}  |{"\n"}
          </Text>

          <Text style={styles.ticketLine3}>
            {ticket_number}
          </Text>

          <Text style={styles.ticketLine4}>
            Timestamp: {this.state.timestamp}
          </Text>
        </View>

        <View style={styles.editTicketButton}>
          <Button
            title="Edit Ticket"
            onPress={() => {
              this.setState({ticket_view_mode: 1});
            }}
            accessibilityLabel="Edit Ticket Button"
          />
        </View>

        <View style={styles.generateTicketListButton}>
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
    return content;
  }

  /**
   * Generate a simple Text display for an individual Ticket
   *
   * @param {Ticket} ticket
   * @param {Boolean} colorEmphasis
   *
   * @return React element display for ticket
   */
  ticketDisplay = (ticket, colorEmphasis = false) => {
    let details = [];
    let emergency = ''
    if (this.state.emergency) {
      emergency = (
      <Text>
        Maintenance Emergency!
      </Text>);
    }
    for (let update of this.state.ticket_updates) {
      // TODO: if timestamp is not a string, add toString()
      details.push(
        <View>
          <Text>
            <Text>
              Updated:
              {'  '}
              {update.timestamp.toString()}
            </Text>
            <Text>
              By:
              {'  '}
              {update.user}
            </Text>
          </Text>
          <Text>
            {update.data}
          </Text>
        </View>
      );
    }

    if (colorEmphasis === true) {let viewStyle = styles.ticketColorBarRed }
    else { let viewStyle = styles.ticketColorBarRed }

    // TODO: Correct implementation to incorporate
    // TicketUpdate item when refactoring
    let content = (
      <View style={viewStyle}>
        <Text>
          {emergency}
          <Text>
            Ticket Number #
            {this.state.ticket_number}
          </Text>
          <Text>
            {this.state.status}
          </Text>
          <Text>
            Submitted:
            {'  '}
            {this.state.timestamp.toString()}
          </Text>
          <Text>
            By:
            {'  '}
            {this.state.email}
          </Text>
        </Text>
        <Text>
          Unit #
          {this.state.unit_number}
          {' '}
          {this.state.location}
        </Text>
        <Text>
          {this.state.ticket_issue_title}
        </Text>
        <Text>
          {this.state.ticket_issue}
        </Text>
        <Text children={[...details]}>
        </Text>
      </View>
    );
    return content;
  }

  //generate ticket list using FlatList
  /**
   * @param  {Object} filter
   * @param {[Ticket]} tickets
   *
   * @return React FlatList display of a list of tickets
   */
  generateTicketList = (tickets = [], filter = {type: 'user', email: 'user@email.com', unit_number: 'this_user_unit'}) => {
    // TODO: grab active user default values from store ^^
    var content;
    let ticketList = getTicketsFromEmail(userStore.email);
    let valid = false;

    // TODO: replace this with active user data imports from data store
    let this_user = {
      email: 'i.am@home.ru',
      unit_number: '1234',
      user_type: CONSTANTS.USER_TYPE.MGMT,
    }

    // TODO: sub in user store user type
    let privilegedUser = this_user.user_type === CONSTANTS.USER_TYPE.MGMT;
    privilegedUser = privilegedUser || this_user.user_type === CONSTANTS.USER_TYPE.MNT;

    let keys = ['ticket_number','timestamp','status','email','emergency','ticket_issue_title'];
    let odd = false;

    for (let oneTicket in tickets) {
      // TODO: add user check vs. user store for 'none' filter
      if (filter.type === 'unit' && oneTicket.unit_number === filter.unit_number && privilegedUser) {
        valid = true;
      } else if (filter.type === 'user' && oneTicket.email === filter.email && privilegedUser) {
        valid = true;
      } else if (filter.type === 'none' && (oneTicket.email === this_user.email || privilegedUser)) {
        valid = true;
      } else if (filter.type === 'emergency' && oneTicket.status && privilegedUser) {
        valid = true;
      }
      if (valid){
        let ticket = {};
        // TODO: push ticket properties onto array in key: value object format
        for (let key of keys) {
          if (!key in oneTicket) {
            console.log('Ticket data missing');
            throw new Error('Ticket data missing');
            break;
          }
          ticket[key] = oneTicket[key];
        }
        ticket[highlight] = odd;
        odd = !odd;
        ticketList.push(ticket);
      }
    }

    content = (
      <View>
        <View style={styles.ticketListContainer}>
          <FlatList
            data={ticketList}
            renderItem={({ticket}) => (
              <View
                id={ticket.ticket_number}
                title={ticket.ticket_issue_title}
                style={ticketColorBar[ticket.highlight]}
              >
              <Text>
                <Text>
                  {ticket.emergency?'Emergency!  ':''}
                  {ticket.status}
                  {' '}
                  #{ticket.ticket_number}
                  {' '}
                  {ticket.ticket_issue_title}
                  {' '}
                  {ticket.timestamp}
                </Text>
                <Button
                  id={ticket.ticket_number}
                  onPress={() => alert(`TODO: Tie in individual ticket detail display`)}
                >
                  <Text>Detail</Text>
                </Button>
              </Text>
              </View>
            )}
            keyExtractor={ticket => ticket.ticket_number}
            extraData={this.state.ticket_view_mode}
          />
        </View>
        <View style={styles.submitTicketUpdateButton}>
          <Button
            title="Go back to detail view"
            onPress={() => {
              this.setState({ticket_view_mode: 0});
            }}

          />
        </View>
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


  /**
   * Create ticket method
   * User selects which unit (Picker)
   * Checkbox with common problems & other textbox
   * emergency level (radio button)
   * If switched to emergency, display warning
   */
  createTicket = () => {

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
  deleteTicket = () => {

  }

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
    height: 120,
    width: '80%',
    marginLeft: '10%',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'white',
    //textAlign: 'left',
    borderRadius: 12,

  },
  ticketLine1: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ticketLine2: {
    fontSize: 18,
  },
  ticketLine3: {
    fontSize: 14,
    textAlign: 'right',
  },
  ticketLine4: {
    fontSize: 14,
    textAlign: 'right',
  },
  editTicketButton: {
    width: 400,
    alignSelf: 'auto',
    //alignSelf: 'right',
  },
  generateTicketListButton: {
    width: 400,
    alignSelf: 'auto'
    //alignSelf: 'left'
  },

  //edit view screen styles
  editTicketPicker: {
    height: 50,
    width: '90%',
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
  },
  editTicketTextInput: {
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    fontSize: 20,
    //placeholderTextColor: 'grey',
    color: 'black',
    backgroundColor: 'white',
  },
  submitTicketUpdateButton: {
    width: 400,
    alignSelf: 'center',

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