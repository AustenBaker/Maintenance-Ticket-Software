import * as React from 'react';
import { View, Button, Text, TextInput, Picker, StyleSheet } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
import { colorScheme, userStore } from '../stores/index';

export default class TicketUpdate extends React.Component {
    constructor (props) {
        super(props);
        this.state = {...TicketUpdate.defaultProps};
        for (let key in props) {
            this.state[key] = this.props[key];
        }
        this.toggleEmergency = this.toggleEmergency.bind(this);
        this.updateTicket = this.updateTicket.bind(this);
    }

    static defaultProps = {
        user: 'none',
        timestamp: Date.now(),
        details: 'No changes.',
        edit_mode: false
    }

    /**
     * If update changes emergency ticket status, update ticket
     * emergency status and return boolean value true if ticket
     * status is now set as an Emergency ticket.
     *
     * @return boolean True if ticket is now flagged as an Emergency ticket.
     */
    toggleEmergency = () => {
        return super.toggleEmergency(this);
    }

    updateTicket = () => {
        return super.addUpdate(this);
    }

    makeUpdate = () => {
        let content = (
            <View style={styles.container}>
              <Text style={styles.ticketUpdateTheme}>
                <Text>
                  Ticket Update:
                  {' '}
                </Text>
                <TextInput
                  label='Details'
                  placeholder={'Additional information.'}
                  value={this.state.details}
                  onValueChange={(value) => this.setState({ details: value})}
                >
                </TextInput>
                <Button
                  title='Add Update'
                  label='Update Ticket'
                  onPress={() => {() => this.setState({
                      timestamp: Date.now(),
                      user: userStore.email,
                      edit_mode: false,
                    }), () => {
                        this.updateTicket();
                        // TODO: Redirect to Ticket display
                  }}}
                >
                  <Text>
                    Update Ticket
                  </Text>
                </Button>
                <Button
                  title='Cancel Update'
                  label='Cancel'
                  onPress={() => {alert(`TODO: return to ticket details`), () => {
                      // TODO: unmount aborted ticket update & return to ticket display
                  }}}
                >
                  <Text>
                    Cancel
                  </Text>
                </Button>
              </Text>
            </View>
        );
        return content;
    }

    getUpdate = () => {
        let content = (
            <View style={styles.container}>
                <Text style={styles.ticketUpdateTheme}>
                    <Text>
                        Updated:
                        {'  '}
                        {new Date(this.state.timestamp).toString()}
                    </Text>
                    <Text>
                        By:
                        {'  '}
                        {this.state.user}
                    </Text>
                </Text>
                <Text style={styles.ticketUpdateTheme}>
                    {this.state.details}
                </Text>
            </View>
        );
        return content;
    }

    render () {
        let content = '';
        if (this.state.edit_mode) {
            content = this.makeUpdate();
        } else {
            content = this.getUpdate();
        }
        return content;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'stretch',
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
    ticketUpdateTheme: {
        fontSize: 16,
    }
});
