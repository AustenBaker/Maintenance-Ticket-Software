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
    ticket_view_mode: CONSTANTS.TICKET_VIEW.DETAIL,
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
        Ticket ID: {this.state.ticket_number}
      </Text>
    );

    //************TicketDetailsView*****************
    content = (
      <View>
        <View testID="ticketContainer" style={styles.ticketDetailsContainer}>
          <Text style={styles.ticketDetailsHeader}>
            Location: Apt. {this.state.unit_number}, {this.state.location} {"\n"}
          </Text>

          <Text style={styles.ticketDetailsBody}>
            Title: {this.state.ticket_issue_title} {"\n"}
            {status} {"\n"}
            {emergency} {"\n"}
            Issue: {this.state.ticket_issue} {"\n"}
            {ticket_number} {"\n"}
          </Text>

          <Text style={styles.ticketDetailsFooter}>
            Submitted: {CONSTANTS.readableTimestamp(this.state.timestamp)}{"\n"}
            Email: {this.state.email} {"\n"}
          </Text>
        </View>

        <View style={styles.editTicketButton}>
          <Button
            title="Update Ticket"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.UPDATE});
            }}
            accessibilityLabel="Update Ticket Button"
          />
        </View>

        <View style={styles.generateTicketListButton}>
          <Button
            title="Show Ticket List"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.LIST});
            }}
            accessibilityLabel="Show Ticket List Button"
          />
        </View>
      </View>
    );
    return content;
  }


  /**
   * Generate a simple Text display for an individual Ticket
   * This will be used to list tickets
   *
   * @param {Ticket} ticket
   * @param {Boolean} colorEmphasis
   *
   * @return React element display for ticket
   */
  ticketDisplay = (ticket, colorEmphasis = false) => {
    let emergency = ''
    if (this.state.emergency) {
      emergency = (
      <Text>
        Maintenance Emergency!
      </Text>);
    }
    let details = this.state.ticket_updates.map((update) => {(
      <View key={update.timestamp}>
        <Text>
          <Text>
            Updated:
            {'  '}
            {CONSTANTS.readableTimestamp(update.timestamp)}
          </Text>
          <Text>
            By:
            {'  '}
            {update.userEmail}
          </Text>
        </Text>
        <Text>
          {update.details}
        </Text>
      </View>
    )});

    let viewStyle = null;
    if (colorEmphasis === true) {viewStyle = styles.ticketColorBarRed }
    else {viewStyle = styles.ticketColorBarRed }

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
            {CONSTANTS.readableTimestamp(this.state.timestamp)}
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


  //create a ticket view of each ticket for ticket list
  simpleTicket = () => {
    var content;
    content = (
      <View style={styles.simpleTicketContainer} key={this.state.ticket_number}>
        <Text>
          Ticket #{this.state.ticket_number}
          {' | '}
          Location: {this.state.unit_number} {this.state.location}
          {' | '}
          Issue: {this.state.ticket_issue_title}
          {this.state.emergency ? " | >>> Emergency! <<<" : null}
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
  generateTicketList =  (tickets = [], filter = {type: 'user', email: 'user@email.com', unit_number: 'this_user_unit'}) => {
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

    //creates tickets for list view
    var simpleTickets = [];
    /**
     * for (let ticket in ticketList) {
     *   simpleTickets.push(this.simpleTicket(ticket));
     * }
     */
    for(let i=0; i<8; i++){
      simpleTickets.push(
        this.simpleTicket()
      );
    }

    content = (
      <View>
        <ScrollView>
          <View style={styles.ticketListContainer}>
           {simpleTickets}
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
                  {CONSTANTS.readableTimestamp(ticket.timestamp)}
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
        </ScrollView>

        <View style={styles.submitTicketUpdateButton}>
          <Button
            title="Go back to detail view"
            onPress={() => {
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.DETAIL});
            }}
          />
        </View>
      </View>
    );
    return content;
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
  updateTicket = () => {
    //content for return
    var content;

    var ticket = this.getTicket();

    //the content that will be returned
    content = (
      <View>

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
              this.setState({ticket_view_mode: CONSTANTS.TICKET_VIEW.DETAIL});
            }}
            accessibilityLabel="Submit Ticket Update Button"
          />
        </View>

      </View>
    );


    return content;
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

  render = () => {
    var content;

    //0 == display single ticket details
    if (this.state.ticket_view_mode === CONSTANTS.TICKET_VIEW.DETAIL) {
      content = this.displayTicketDetails();
    }

    //1 === ticket edit
    else if (this.state.ticket_view_mode === CONSTANTS.TICKET_VIEW.UPDATE){
      content = this.updateTicket();
    }
    //2 === ticketlist
    else if (this.state.ticket_view_mode === CONSTANTS.TICKET_VIEW.LIST){
      content = this.generateTicketList();
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
  ticketDetailsHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ticketDetailsBody: {
    fontSize: 16,
    lineHeight: 32,
  },
  ticketDetailsFooter: {
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'right'
  },
  editTicketButton: {
    width: 400,
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
  submitTicketUpdateButton: {
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
