import * as React from 'react';
import { TextInput, Text, Button, View, StyleSheet, Picker } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
import Ticket from './Ticket.js';
import Colors from '../constants/Colors'
import { colorScheme } from '../stores';

// TODO: Update unit to include property indicator
export default class User extends React.Component {

    /**
     *
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            first: props.first,
            last: props.last,
            units: [...props.units],
            email: props.email,
            phone: props.phone,
            contactPreference: props.contactPreference,
            entryPermission: props.entryPermission,
            type: ('type' in props ? props.type : CONSTANTS.USER_TYPE.RES),
            note: ('note' in props ? props.note : ""),
            edit_mode: ('edit_mode' in props ? props.edit_mode : false),
            tickets: [],
            activate: props.activate
        }
    }

    /**
     * Declare default values for User props in the event they
     * are not all passed into the constructor.
     */
    static defaultProps = {
        username: "",
        first: "First Name",
        last: "Last Name",
        units: ["1703"],
        email: "default@CastlebergCommunities.com",
        phone: "000-000-0000",
        contactPreference: CONSTANTS.PREFERRED_CONTACT.EMAIL,
        entryPermission: CONSTANTS.ENTRY_PERMISSION.ACC,
        type: CONSTANTS.USER_TYPE.RES,
        note: "",
        tickets: [],
        activate: false,
        edit_mode: false
    }

    toggleUserActivation = (props) => {
        let isActivated = false;
        if (!(props.username === undefined ||
          props.username === this.state.username ||
          this.state.type !== CONSTANTS.USER_TYPE.MGMT)) {
              if (props.activate) {
                  // TODO: deactivate target user account
              } else {
                  // TODO: fetch user account data & post update to activate
                  isActivated = true;
              }
          }
        return isActivated;
    }

    /**
     * This method generates the <View> to display the
     * user information.
     *
     * @returns React Native encoding for user display
     */
    displayUser = () => {
      let themeBodyText =
        colorScheme.theme === 'light' ? styles.iosLightThemeText : styles.iosDarkThemeText;

        let content;

        let name = (
            <Text testId="user-name">
                Name: <Text testId="user-first">{this.state.first}</Text><Text testId="user-last">{this.state.last}</Text>
            </Text>
        );

        let apt = '';
        // TODO: figure out how to render Unit listing
        if (!this.state.units === undefined) {
            apt = (
                <Text testId="user-units">
                </Text>
            );
        };

        let phoneCheck = this.state.phone !== User.defaultProps.phone;
        let email, phone = "";
        // Only star email if it is the preferred contact method and
        // a phone number is also available.
        if (this.state.contactPreference === CONSTANTS.PREFERRED_CONTACT.EMAIL && phoneCheck) {
            email = (
            <Text testId="user-email" style={themeBodyText}>
            Email: {this.state.email + "* "}
            </Text>
            );
        } else {
            email = (
            <Text testID="user-name" style={themeBodyText}>
            Email: {this.state.email}
            </Text>
            );
        }
        if (phoneCheck) {
            if (this.state.contactPreference === CONSTANTS.PREFERRED_CONTACT.TXT) {
                phone = (
                    <Text testId="user-phone" style={themeBodyText}>Phone: {this.state.phone + "*\n"}
                    * = Preferred contact method.
                    </Text>
                );
            } else {
                phone = (
                    <Text testID="user-phone" style={themeBodyText}>Phone: {this.state.phone + "\n"}
                    * = Preferred contact method.
                    </Text>
                );
            }
        };

        // Embed entry permission data in a <Text> container.
        let entry = (
            <Text testId="user-entry" style={themeBodyText}>
                {(this.state.entryPermission === CONSTANTS.ENTRY_PERMISSION.ANY) ? "Entry: Allowed."
                : (this.state.entryPermission === CONSTANTS.ENTRY_PERMISSION.NOT) ? "Entry: Notify before entry."
                : "Entry: Accompanied entry only."}
            </Text>
        );

        // if note exists, create a <Text> container for it
        var note = "";
        if (this.state.note !== "") {
            note = (
                <Text>
                  {"Note: \n"}
                  {this.state.note}
                </Text>
            );
        } else {
          note = (<Text></Text>);
        }

        var editButton = (<Button
            title="Edit Profile"
            onPress={() => this.update(this)}
            accessibilityLabel="Update Profile Button"
        />);

        // label & put user info into a <View><Text> wrapper
        // for display
        content = (
            <View>
              {name}
              {email}
              {phone}
              {entry}
              {note}
            </View>
          ); // TODO: add edit button
        return content;
    }

    /**
     * This method is used to assign a unit to a resident user.
     * No duplicate values will be added to assigned units list.
     *
     * @param units array of units to be assigned to user
     */
    assignUnit = (props) => {
        for (let unit of props.units) {
            // check to see if the unit is already assigned to user
            if (unit in this.state.units === false) {
                this.setState(units, [...this.state.units, unit]);
            }
        }
    }

    /**
     * This method posts updated user information to server.
     * Allows update for all user profile data except password.
     *
     * @param first User first name
     * @param last User last name
     * @param email User email address
     * @param phone User phone number (optional)
     * @param contactPreference User preferred contact method (email/text)
     * @param entryPermission User entry preference
     * @param note Note from user regarding special circumstances
     *
     * @returns true if updated successfully
     */
    update = (props) => {
        var updated = false;
        var checked = [];
        // check and store valid values in an array
        if ('first' in props && CONSTANTS.REGEX.NAME.exec(props.first)) {
            checked.push({['first']: props.first});
        }
        if ('last' in props && CONSTANTS.REGEX.NAME.exec(props.last)) {
            checked.push({['last']: props.last});
        }
        if ('email' in props && CONSTANTS.REGEX.EMAIL.exec(props.email)) {
            checked.push({['email']: props.email});
        }
        if ('phone' in props && CONSTANTS.REGEX.PHONE.exec(props.phone)) {
            checked.push({['phone']: props.phone});
        }
        if ('contactPreference' in props && props.contactPreference in CONSTANTS.PREFERRED_CONTACT) {
            checked.push({['contactPreference']: props.contactPreference});
        }
        if ('entryPermission' in props &&
          props.entryPermission in  CONSTANTS.ENTRY_PERMISSION){
            checked.push({['entry']: props.entry});
        }
        if ('note' in props && CONSTANTS.REGEX.MEMO.exec(props.note)) {
            checked.push({['note']: props.note});
        }

        // TODO: update server state and this.setState
        return updated;
    }

    /**
     * This method allows a management user to change
     * another user's user type.
     *
     * @requires User to be management user type
     *
     * @param userName Name of user to be upgraded
     * @param userType Desired new user type
     *
     * @returns True if user type successfully changed.
     */
    setUserType = (props) => {
        let success = false;
        if (this.state.type === CONSTANTS.USER_TYPE.MGMT) {
            // TODO: implement this!
            // access server in order to
            // verify userName is a valid user and then update
            // their user type to userType
            // once a response is received from server,
            // update success & return
            success = true;
        }
        return success;
    }

    /**
     * This method checks to see if the user is authorized to
     * perform the requested activity.
     *
     * @param activity The activity to be performed
     *
     * @returns True if the user is authorized to perform the
     * specified activity.
     */
    isAuthorized = (props, activity, targetTicket = undefined, targetUser = this.state.email, targetUnit = undefined) => {
        // TODO: double check parameter passing rules for class methods.  This may need to be relocated or
        // restructured.
        // Initialize all test values to false so authorization defaults to denial
        let active, valid, isMgmt, isMnt = false;
        // TODO: check for valid session & user account activation
        // and assign value to active
        if (active) {
            // Check if User is MGMT
            isMgmt = this.state.type === CONSTANTS.USER_TYPE.MGMT;

            // Check if User is MNT
            isMnt = this.state.type === CONSTANTS.USER_TYPE.MNT;
        } else {
            // User is not authenticated or does not have an active account
            return valid;
        }
        // TODO: add more activity authorization checks
        // Check to see if user is authorized to perform requested activity
        switch (activity) {
            case 'create ticket': {
                // MGMT/MNT users can make tickets for any unit/property
                let proceed = isMgmt || isMnt;
                // RES users can only make tickets for their own units
                proceed = proceed || (!(targetUnit === undefined) && !(this.state.units === undefined) &&
                    (targetUnit in this.state.units));
                valid = proceed;
                break;
            };
            case 'update ticket', 'close ticket': {
                // MGMT/MNT users can update or close any ticket
                let proceed = isMgmt || isMnt;
                // RES users can only update or close their own tickets
                proceed = proceed || (!(targetTicket === undefined) && !(this.state.tickets === undefined) &&
                    (ticket in this.state.tickets));
                valid = proceed;
                break;
            };
            case 'assign unit', 'delete ticket', 'manage property': {
                // MGMT users can assign residents to units, delete tickets and manage property
                valid = isMgmt;
                break;
            };
            case 'manage user': {
                // MGMT users can activate, deactivate, promote or delete other user accounts,
                // but not their own account
                valid = isMgmt && targetUser !== this.state.email;
                break;
            };
            default: {
                // Deny authorization for any inactive, unauthorized or anonymous user or
                // any unrecognized command.
                break;
            };
        };
        return valid;
    };

    /**
     * This method returns object containing current user profile values.
     *
     * @returns Object containing properties and values of the user.
     */
    getProfile = () => {
        let profile = {
            first: this.state.first,
            last: this.state.last,
            units: [...this.state.units],
            email: this.state.email,
            phone: this.state.phone,
            contactPreference: this.state.contactPreference,
            entryPermission: this.state.entryPermission,
            type: this.state.type,
            note: this.state.note,
            edit_mode: this.state.edit_mode,
            tickets: [...this.state.tickets]
        };
        return profile;
    };

    /**
     * This method generates the form to display the User profile
     * when in edit mode.
     *
     * @returns React Native encoding to edit user profile
     */
    editUser = () => {
        // store React Native element encoding being generated for return
        let content;

        // store user profile modifications in progress before submission
        // set initial value to pre-existing user profile
        const profile = this.getProfile();

        // if edit mode, then update profile
        // if not edit mode, then create user
        let editable = this.state.edit_mode;
        var submitButton;
        if (editable) {
            submitButton = (<Button
                title="Update"
                onPress={() => this.update(this)}
                accessibilityLabel="Update Profile Button"
            />);
        } else {
            submitButton = (<Button
                title="Create Account"
                onPress={() => {
                    // TODO: generate 'human validation' captcha test, and if passed,
                    // generate 'new account' message for management to flag account for unit assignment

                    // calls function to update user profile data in database
                    this.update(this);
                }}
                accessibilityLabel="Create Account Button"
            />);
        };
        let resetButton = (<Button
            title="Reset"
            onPress={() => {
                // TODO: return this.state to previous state using profile values
            }}
            accessibilityLabel="Reset Profile Button"
        />);
        let cancelButton = (<Button
            title="Cancel"
            onPress={() => alert(`TODO: navigate to previous page or home`)}
            accessibilityLabel="Cancel Button"
        />);

        content = (
            <View>
              <TextInput
                label="First Name"
                placeholder={this.state.first}
                keyboardType="default"
                maxLength={32}
                selectTextOnFocus={true}
                textContentType="name"
                autoCompleteType="name"
                errorMessage="This field is required."
                onChangeText={fname => this.setState(first, fname)}
              />
              <TextInput
                label="Last Name"
                placeholder={this.state.last}
                keyboardType="default"
                maxLength={32}
                selectTextOnFocus={true}
                textContentType="familyName"
                autoCompleteType="name"
                errorMessage="This field is required."
                onSubmitEditing={lname => this.setState(last, lname)}
              />
              <TextInput
                label="Email"
                placeholder={this.state.email}
                keyboardType="email-address"
                maxLength={32}
                selectTextOnFocus={true}
                textContentType="emailAddress"
                autoCompleteType="email"
                errorMessage="This field is required.  Please enter valid email address."
                onSubmitEditing={emailAddr => this.setState(email, emailAddr)}
              />
              <TextInput
                label="Phone Number"
                placeholder={this.state.phone}
                keyboardType="phone-pad"
                maxLength={12}
                selectTextOnFocus={true}
                textContentType="telephoneNumber"
                autoCompleteType="tel"
                errorMessage="Please enter valid phone number: ###-###-####"
                onSubmitEditing={phoneNum => this.setState(phone, phoneNum)}
              />
              <Picker
                label="Preferred Contact Method:"
                selectedValue={this.state.contactPreference}
                onValueChange={(itemValue, itemIndex) => this.setState(contactPreference, itemValue)}
                >
                <Picker.Item
                    label='Email'
                    value={CONSTANTS.PREFERRED_CONTACT.EMAIL}
                />
                <Picker.Item
                    label='Text'
                    value={CONSTANTS.PREFERRED_CONTACT.TXT}
                />
              </Picker>
              <Picker
                label="Entry Permission:"
                selectedValue={this.state.entryPermission}
                onValueChange={(itemValue, itemIndex) => this.setState(entryPermission, itemValue)}
                >
                <Picker.Item
                    label='Allow accompanied entry'
                    value={CONSTANTS.ENTRY_PERMISSION.ACC}
                />
                <Picker.Item
                    label='Notify before entry'
                    value={CONSTANTS.ENTRY_PERMISSION.NOT}
                />
                <Picker.Item
                    label='Allow entry'
                    value={CONSTANTS.ENTRY_PERMISSION.ANY}
                />
              </Picker>
              <TextInput
                  label="Note"
                  defaultValue={this.state.note}
                  keyboardType="default"
                  maxLength={255}
                  selectTextOnFocus={true}
                  testID={"note-edit"}
                  onSubmitEditing={someNote => this.setState(note, someNote)}
              />
              {submitButton}
              {resetButton}
              {cancelButton}
            </View>
        );
        return content;
    }

    /**
     * This method generates a list of tickets created by this
     * user.
     *
     * @param filter Filter ticket list by none, open, closed.
     *
     * @returns List of user's tickets.
     */
    listTickets = (props) => {
        var ticketList = [];
        var content;
        if (props.filter === undefined || props.filter === 'none') {
            ticketList = this.state.tickets;
        } else if (props.filter === 'open') {
            // generates list of user's tickets that are open
            for (let ticket of this.state.tickets) {
                if (ticket.isOpen()) {
                    ticketList.push(ticket);
                }
            }
        } else if (props.filter === 'closed') {
            // generates list of user's tickets that are closed
            for (let ticket of this.state.tickets) {
                if (!ticket.isOpen()) {
                    ticketList.push(ticket);
                }
            }
        }
        for (ticket in ticketList) {
            content += ""; // TODO: add Ticket display items
        }
        return content;
    }

    /**
     * This method allows user to update their password.
     *
     * @param pwd New password
     *
     * @returns True if password change completed successfully.
     */
    changePassword = (props) => {
        var updated = false;
        // TODO: add session validation check
        if (props.pwd !== undefined && CONSTANTS.REGEX.PASSWORD.exec(props.pwd)) {
            // TODO: process password update
            // fire off email reset or handle email message link
        }
        return updated;
    }

    /**
     * This method renders the User element on the client device.
     *
     * @returns React Native encoding for User element display.
     */
    render = () => {
        var content = null;
        // TODO: Implement tests for Create Account display
        if (this.state.edit_mode){
            // if in edit mode, display form for user profile update
            content=this.editUser();
        } else {
            // if not in edit mode, simply display user info
            content=this.displayUser();
        }
        return (content);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iosLightThemeText: {
    color: Colors.black,
    fontSize: 17
  },
  iosDarkThemeText: {
    color: Colors.white,
    fontSize: 17
  }
});
