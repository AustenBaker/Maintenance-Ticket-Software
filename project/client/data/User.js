import * as React from 'react';
import { TextInput, Text, Button, View, StyleSheet, Picker } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
import Ticket from './Ticket.js';
import Colors from '../constants/Colors'
import { colorScheme } from '../stores';
import { observe } from 'mobx';

// @observe
// TODO: Update unit to include property indicator
export default class User extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = User.defaultProps;
        for (let prop in props) {
            if (prop in CONSTANTS.USER_PROPERTIES || prop === 'edit_mode')
              this.state[prop] = props[prop];
        };
    }

    /**
     * Declare default values for User props in the event they
     * are not all passed into the constructor.
     */
    static defaultProps = {
        username: "",
        first: "First Name",
        last: "Last Name",
        units: [], // ex: {property: CONSTANTS.PROPERTY.WSP, number: '1703'}
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

    toggleUserActivation = (username) => {
        let isActivated = false;
        if (!(username === undefined ||
          username === this.state.username || 
          this.state.type !== CONSTANTS.USER_TYPE.MGMT)) {
              if (isActivated) {
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
            <Text>
                Name: <Text testID="user-first">{this.state.first}</Text><Text testID="user-last">{this.state.last}</Text>
            </Text>
        );

        let apt = '';
        // TODO: figure out how to render Unit listing
        if (!this.state.units === undefined) {
            apt = (
                <Text testID="user-units">
                  Units: {this.state.units.toString()}
                </Text>
            );
        };

        let phoneCheck = this.state.phone !== User.defaultProps.phone;
        let email = "";
        // Only star email if it is the preferred contact method and
        // a phone number is also available.
        if (this.state.contactPreference === CONSTANTS.PREFERRED_CONTACT.EMAIL && phoneCheck) {
            email = (
            <Text testID="user-email" style={themeBodyText}>
            Email: {this.state.email + "* "}
            </Text>
            );
        } else {
            email = (
            <Text testID="user-email" style={themeBodyText}>
            Email: {this.state.email}
            </Text>
            );
        };

        let phone = "";
        // If phone number is preferred contact method, star phone number.
        // Print out both phone number and contact preference note if user
        // phone number is available.
        if (phoneCheck) {
            if (this.state.contactPreference === CONSTANTS.PREFERRED_CONTACT.TXT) {
                phone = (
                    <Text testID="user-phone" style={themeBodyText}>Phone: {this.state.phone + "*\n"}
                    * = Preferred contact method.
                    </Text>
                );
            } else {
                phone = (
                    <Text testID="user-phone" style={themeBodyText}>Phone: {this.state.phone + "\n"}
                    * = Preferred contact method.
                    </Text>
                );
            };
        };

        // Embed entry permission data in a <Text> container.
        let entry = (
            <Text testID="user-entry" style={themeBodyText}>
                {(this.state.entryPermission === CONSTANTS.ENTRY_PERMISSION.ANY) ? "Entry: Allowed."
                : (this.state.entryPermission === CONSTANTS.ENTRY_PERMISSION.NOT) ? "Entry: Notify before entry."
                : "Entry: Accompanied entry only."}
            </Text>
        );

        // Embed note in a <Text> container if one exists.
        let note = "";
        if (this.state.note !== "") {
            note = (
                <Text testID="user-note">
                  {"Note: \n"}
                  {this.state.note}
                </Text>
            );
        };

        let editButton = (
            <Button
                title="Edit Profile"
                accessibilityLabel="Edit Profile Button"
                onPress={() => this.setState(edit_mode, true)}
            >
            <Text testID="edit-button">Edit Profile</Text>
            </Button>
        );

        // label & put user info into a <View><Text> wrapper
        // for display
        content = (
            <View>
              {name}
              {apt}
              {email}
              {phone}
              {entry}
              {note}
              {editButton}
            </View>
          );
        return content;
    }

    /**
     * This method is used to assign a unit to a resident user.
     * No duplicate values will be added to assigned units list.
     *
     * @param username Username of user to be assigned unit
     * @param unit Unit number of unit to be assigned to user
     * 
     * @return true if unit assignment succeeds, false if it fails.
     */
    assignUnit = (username, unit) => {
        let assigned = false;
        // TODO: check the logic here, do we want to return true if user is already assigned to the unit?
        // The unit addition needs to be statefully executed so sequential additions will all resolve properly
        // despite being asynchronous.
        if (!(unit === undefined) && ((this.state.units === undefined) || !(unit in this.state.units))) {
            this.setState((state) => {
                return {units: [...state.units, unit]};
            });
            // TODO: fetch user data from username, update unit assignment, post update to database
            assigned = true;
        };
        return assigned;
    };

    /**
     * This method posts updated user profile information to server.
     * Allows update for all user profile data except password.
     *
     * @param {String} first User first name
     * @param {String} last User last name
     * @param {String} email User email address
     * @param {String} phone User phone number (optional)
     * @param {String} contactPreference User preferred contact method (email/text)
     * @param {String} entryPermission User entry preference
     * @param {String} note Note from user regarding special circumstances
     *
     * @returns true if updated successfully
     */
    updateProfile = (first, last, email, phone, contactPreference, entryPermission, note) => {
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
     * @param {String} username Name of user to be upgraded
     * @param {String} type Desired new user type
     *
     * @returns True if user type successfully changed.
     */
    setUserType = (username, type) => {
        let success = false;
        if (!(username === undefined || this.state.type !== CONSTANTS.USER_TYPE.MGMT ||
            username === this.state.username || !(type in CONSTANTS.USER_TYPE))) {
            try {
                // TODO:  is there a way to only update the specified properties
                // rather than pulling all unaltered user properties along with them?
                let toUpdate = getUserFromUsername(username);
                toUpdate.type = type;
                let result = update(...toUpdate);
                // TODO: verify results or throw error
                let keys = [];
                for (let prop in result) {
                    keys.push(prop);
                    if (!(prop in CONSTANTS.USER_PROPERTIES) || !(prop in toUpdate) || result[prop] !== toUpdate[prop]) {
                        throw error('Failed to update');
                    }
                }
                for (let prop in toUpdate) {
                    if (!(prop in keys)) throw error('Failed to update');
                }
                success = true;
            } catch (err) {
                // error happened trying to load data from or post data to the database
            }
        }
        return success;
    }

    /**
     * This method checks to see if the user is authorized to
     * perform the requested activity.
     *
     * @param {String} activity The activity to be performed
     * @param {Number} targetTicket Ticket number of target Ticket of activity (optional)
     * @param {String} targetUser Email address of user target of activity (defaults to self)
     * @param {{String}, {String}} Unit number of unit target of activity (optional)
     *
     * @returns True if the user is authorized to perform the
     * specified activity.
     */
    isAuthorized = (activity, targetTicket = undefined, targetUser = this.state.email, targetUnit = undefined) => {
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
        let profile = {};
        for (let field in this.state) {
            profile[field] = this.state[field];
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
        let editable = this.state.edit_mode && !this.state.activate;
        var submitButton;
        if (editable) {
            submitButton = (<Button
                title="Update"
                onPress={() => this.updateUser(this.state)}
                accessibilityLabel="Update Profile Button"
            >
                <Text testId="update-button">Update</Text>
            </Button>);
        } else {
            submitButton = (<Button
                title="Create Account"
                onPress={() => {
                    // TODO: generate 'human validation' captcha test, and if passed,
                    // generate 'new account' message for management to flag account for unit assignment

                    // calls function to update user profile data in database
                    this.updateUser(this.state);
                }}
                accessibilityLabel="Create Account Button"
            >
                <Text testId="create-button">Create Account</Text>
            </Button>);
        };
        let resetButton = (<Button
            title="Reset"
            onPress={() => {
                for (let field in profile) {
                    this.setState([field], profile[field]);
                }
            }}
            accessibilityLabel="Reset Profile Button"
        >
            <Text testId="reset-button">Reset</Text>
        </Button>);
        let cancelButton = (<Button
            title="Cancel"
            onPress={() => alert(`TODO: navigate to previous page or home`)}
            accessibilityLabel="Cancel Button"
        >
            <Text testId="cancel-button">Cancel</Text>
        </Button>);

        content = (
            <View>
              <TextInput
                label="First Name"
                testId="edit-first"
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
                testId="edit-last"
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
                testId="edit-email"
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
                testId='edit-phone'
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
                testID='edit-contact'
                selectedValue={this.state.contactPreference}
                onValueChange={(itemValue, itemIndex) => this.setState(contactPreference, itemValue)}
                >
                <Picker.Item
                    label='Email'
                    testID='edit-contact-e'
                    value={CONSTANTS.PREFERRED_CONTACT.EMAIL}
                />
                <Picker.Item
                    label='Text'
                    testID='edit-contact-t'
                    value={CONSTANTS.PREFERRED_CONTACT.TXT}
                />
              </Picker>
              <Picker
                label="Entry Permission:"
                testID='edit-entry'
                selectedValue={this.state.entryPermission}
                onValueChange={(itemValue, itemIndex) => this.setState(entryPermission, itemValue)}
                >
                <Picker.Item
                    label='Allow accompanied entry'
                    testID='edit-entry-acc'
                    value={CONSTANTS.ENTRY_PERMISSION.ACC}
                />
                <Picker.Item
                    label='Notify before entry'
                    testID='edit-entry-not'
                    value={CONSTANTS.ENTRY_PERMISSION.NOT}
                />
                <Picker.Item
                    label='Allow entry'
                    testID='edit-entry-any'
                    value={CONSTANTS.ENTRY_PERMISSION.ANY}
                />
              </Picker>
              <TextInput
                  label="Note"
                  testId="edit-note"
                  defaultValue={this.state.note}
                  keyboardType="default"
                  maxLength={255}
                  selectTextOnFocus={true}
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
     * @param {String} filter Filter ticket list by none, open, closed.
     *
     * @returns {Number[]} List of user's tickets.
     */
    listTickets = (props) => {
        let ticketList = [];
        if ((props.filter === undefined || props.filter === 'none') && !(this.state.tickets === undefined)) {
            for (let ticket of this.state.tickets) {
                ticketList.push(ticket);
            };
        } else if (props.filter === CONSTANTS.STATUS.OPEN) {
            // generates list of user's tickets that are open
            for (let ticket of this.state.tickets) {
                if (ticket.isOpen()) {
                    ticketList.push(ticket);
                }
            }
        } else if (props.filter === CONSTANTS.STATUS.CLOSED) {
            // generates list of user's tickets that are closed
            for (let ticket of this.state.tickets) {
                if (!ticket.isOpen()) {
                    ticketList.push(ticket);
                }
            }
        }
        return ticketList;
    }

    /**
     * This method allows user to update their password.
     *
     * @param {String} pwd New password
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

