import * as React from 'react';
import { TextInput, Text, Button, View, StyleSheet, Picker } from 'react-native';
import * as CONSTANTS from '../constants/Reference';
// import Ticket from './Ticket.js';
import Colors from '../constants/Colors'
import { userStore, colorScheme } from '../stores';

// TODO: Update unit to include property indicator
export default class User extends React.Component {

    /**
     *
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {...User.defaultProps};
        for (let key in props) {
            if (key in this.state) {
                this.state[key] = props[key];
            }
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
            <Text testID="user-name" style={themeBodyText}>
                Name:
                {" "}
                <Text testID="user-first" style={themeBodyText}>
                {this.state.first}
                </Text>
                {" "}
                <Text testID="user-last" style={themeBodyText}>
                {this.state.last}
                </Text>
            </Text>
        );

        let apt = '';
        // TODO: figure out how to render Unit listing
        if (!this.state.units === undefined) {
            apt = (
                <Text testID="user-units" style={themeBodyText}>
                Units:
                {" "}
                </Text>
            );
        };

        let phoneCheck = this.state.phone !== User.defaultProps.phone;
        let email, phone = "";
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
        }
        if (phoneCheck) {
            if (this.state.contactPreference === CONSTANTS.PREFERRED_CONTACT.TXT) {
                phone = (
                    <Text testID="user-phone" style={themeBodyText}>Phone: {this.state.phone + "*\n"}
                    * = Preferred contact method.
                    {'\n\n'}
                    </Text>
                );
            } else {
                phone = (
                    <Text testID="user-phone" style={themeBodyText}>Phone: {this.state.phone + "\n"}
                    * = Preferred contact method.
                    {'\n\n'}
                    </Text>
                );
            }
        };

        // Embed entry permission data in a <Text> container.
        let entry = (
            <Text testID="user-entry" style={themeBodyText}>
                Entry Permission:
                {(this.state.entryPermission === CONSTANTS.ENTRY_PERMISSION.ANY) ? "  Allowed."
                : (this.state.entryPermission === CONSTANTS.ENTRY_PERMISSION.NOT) ? "  Notify before entry."
                : "  Accompanied entry only."}
                {'\n\n'}
            </Text>
        );

        // if note exists, create a <Text> container for it
        var note = "";
        if (!(this.state.note === undefined || this.state.note === "")) {
            note = (
                <View testID="user-note" style={styles.memoBox}>
                  <Text style={themeBodyText}>{"Note:"}</Text>
                  <Text style={themeBodyText}>{this.state.note}</Text>
                </View>
            );
        }

        var editButton = (<Button
            title="Edit Profile"
            testID="edit-button"
            accessibilityLabel="Edit Profile Button"
            style={themeBodyText}
            onPress={() => this.setState({'edit_mode': true})}
        />);

        // label & put user info into a <View><Text> wrapper
        // for display
        content = (
            <View style={styles.container}>
              <View style={styles.container, styles.form}>
                {name}
                {email}
                {phone}
                {entry}
                {note}
              </View>
              <View style={styles.buttons}>
                <View style={styles.bigButton}>
                  {editButton}
                </View>
              </View>
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
    updateUser = (props) => {
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
        let themeBodyText =
        colorScheme.theme === 'light' ? styles.iosLightThemeText : styles.iosDarkThemeText;

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
                testID="update-button"
                style={styles.button}
                onPress={() => {
                    // calls updateUser to update database in setState callback function,
                    // this forces setState updates to process before pushing the server update
                    this.setState({'edit_mode' : false}, () => this.updateUser(this));
                }}
                accessibilityLabel="Update Profile Button"
                style={themeBodyText}
            />);
        } else {
            submitButton = (<Button
                title="Create Account"
                testID="create-button"
                accessibilityLabel="Create Account Button"
                style={themeBodyText}
                onPress={() => {
                    // TODO: generate 'human validation' captcha test, and if passed,
                    // generate 'new account' message for management to flag account for
                    // activation and unit assignment

                    // calls updateUser to update database in setState callback function,
                    // this forces setState updates to process before pushing the server update
                    this.setState({'edit_mode' : false}, () => this.updateUser(this));
                }}
            />);
        };
        let resetButton = (<Button
            title="Reset"
            testID="reset-button"
            accessibilityLabel="Reset Profile Button"
            style={themeBodyText}
            onPress={() => {
                // returns this.state to previous state using profile values
                this.setState({'edit_mode': true}, () => {
                  // TODO: implement restore from userStore
                  for (let key in profile) {
                    if (key === 'units' || key === 'tickets') {
                        this.setState({key: [...profile[key]]});
                    } else {
                        this.setState({key: profile[key]});
                        console.log('key: ' + key + ', value: ' + profile[key] + ', ');
                        console.log('state: ' + this.state[key])
                    }
                  }
                });
                // TODO: figure out why this is not re-rendering
            }}
        />);
        let cancelButton = (<Button
            title="Cancel"
            testID="cancel-button"
            accessibilityLabel="Cancel Button"
            style={themeBodyText}
            onPress={() => {
                this.setState({'edit_mode' : false}, () => {
                    for (let key in profile) {
                        if (key === 'units' || key === 'tickets') {
                          this.setState({key: [...profile[key]]});
                        } else {
                          this.setState({key: profile[key]});
                          console.log('key: ' + key + ', value: ' + profile[key] + ', ');
                          console.log('state: ' + this.state[key])
                        }
                    };
                });
            }}
        />);

        let name = (
            <Text style={themeBodyText}>
                Name:
                {" "}
                <TextInput
                  label="First Name"
                  placeholder={"First Name"}
                  value={this.state.first}
                  keyboardType="default"
                  maxLength={32}
                  selectTextOnFocus={true}
                  textContentType="name"
                  autoCompleteType="name"
                  errormessage="This field is required."
                  onChangeText={fname => this.setState({'first': fname})}
                  style={themeBodyText, styles.formLineShared}
                />
                {"  "}
                <TextInput
                  label="Last Name"
                  placeholder={"Last Name"}
                  value={this.state.last}
                  keyboardType="default"
                  maxLength={32}
                  selectTextOnFocus={true}
                  textContentType="familyName"
                  autoCompleteType="name"
                  errormessage="This field is required."
                  onChangeText={lname => this.setState({'last': lname})}
                  style={themeBodyText, styles.formLineShared}
                />
            </Text>
        );

        let email = (
            <Text style={themeBodyText}>
              Email:
              {"  "}
              <TextInput
                label="Email"
                placeholder={"your.email@server.com"}
                value={this.state.email}
                keyboardType="email-address"
                maxLength={32}
                selectTextOnFocus={true}
                textContentType="emailAddress"
                autoCompleteType="email"
                errormessage="This field is required.  Please enter valid email address."
                onChangeText={emailAddr => this.setState({'email': emailAddr})}
                style={themeBodyText, styles.formLineSolo}
              />
            </Text>
        );

        let phone = (
            <Text style={themeBodyText}>
              Phone:
              {"  "}
              <TextInput
                label="Phone Number"
                placeholder={"###-###-####"}
                value={this.state.phone}
                keyboardType="phone-pad"
                maxLength={12}
                selectTextOnFocus={true}
                textContentType="telephoneNumber"
                autoCompleteType="tel"
                errormessage="Please enter valid phone number: ###-###-####"
                onChangeText={phoneNum => this.setState({'phone': phoneNum})}
                style={themeBodyText, styles.formLineSolo}
              />
            </Text>
        );

        let prefcon = (
            <Text style={themeBodyText}>
                {'\n'}
                Preferred Contact:
                {"  "}
                <Picker
                  label="Preferred Contact Method:"
                  selectedValue={this.state.contactPreference}
                  onValueChange={(itemValue, itemIndex) => this.setState({'contactPreference': itemValue})}
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
            </Text>
        );

        let enter = (
            <Text style={themeBodyText}>
                {'\n'}
                Entry Permission:
                {"  "}
                <Picker
                  label="Entry Permission:"
                  selectedValue={this.state.entryPermission}
                  onValueChange={(itemValue, itemIndex) => this.setState({'entryPermission': itemValue})}
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
              {'\n\n'}
            </Text>
        );

        let note = (
            <View style={styles.memoBox}>
              <Text style={themeBodyText}>
                Note:
              </Text>
              <TextInput
                  label="Note"
                  placeholder={"Enter note here."}
                  defaultValue={this.state.note}
                  keyboardType="default"
                  maxLength={255}
                  multiline
                  numberOfLines={4}
                  selectTextOnFocus={true}
                  testID={"note-edit"}
                  onChangeText={someNote => this.setState({'note': someNote})}
                  style={styles.memo}
                />
            </View>
        );
        content = (
          <View style={styles.container}>
            <View style={styles.container, styles.form}>
              {name}
              {email}
              {phone}
              {prefcon}
              {enter}
              {note}
            </View>
            <View style={styles.buttons}>
              <View style={styles.smallButton}>
                {submitButton}
              </View>
              <View style={styles.smallButton}>
                {resetButton}
              </View>
              <View style={styles.smallButton}>
                {cancelButton}
              </View>
            </View>
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
    listTickets = (filter) => {
        let ticketList = [];
        if (filter === undefined || filter === 'none') {
            for (let ticket in this.state.tickets) {
                ticketList.push(ticket);
            }
        } else if (filter === 'open') {
            // generates list of user's tickets that are open
            for (let ticket of this.state.tickets) {
                if (ticket.isOpen()) {
                    ticketList.push(ticket);
                }
            }
        } else if (filter === 'closed') {
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
    flexDirection: 'column',
    alignSelf: 'center',
    alignContent: 'center',
    margin: 20,
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    direction: 'ltr',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    alignContent: 'flex-start',
    borderRadius: 10,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#555555',
    shadowOffset: {
        width: 10,
        height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 6,
  },
  formLineSolo: {
    padding: 2,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignContent: 'stretch',
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderBottomColor: 'darkgrey',
    borderRightColor: 'darkgrey',
  },
  formLineShared: {
      flex: 0.3,
      padding: 2,
      flexDirection: 'column',
      alignSelf: 'stretch',
      alignContent: 'stretch',
      borderWidth: 2,
      borderColor: 'lightgrey',
      borderBottomColor: 'darkgrey',
      borderRightColor: 'darkgrey',
  },
  memoBox: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  memo: {
    width: '100%',
    fontSize: 17,
    flex: 1,
    padding: 2,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignContent: 'stretch',
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderBottomColor: 'darkgrey',
    borderRightColor: 'darkgrey',
},
  iosLightThemeText: {
    color: Colors.black,
    fontSize: 17,
    padding: 2,
  },
  iosDarkThemeText: {
    color: Colors.white,
    fontSize: 17,
    padding: 2,
  },
  buttons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      direction: 'ltr',
      alignItems: 'center',
      alignSelf: 'stretch',
      alignContent: 'flex-start',
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 2,
  },
  bigButton: {
    flex: 1,
    margin: 0,
    flexDirection: 'column',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignSelf: 'stretch',
    shadowColor: '#555555',
    shadowOffset: {
        width: 10,
        height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 8,
  },
  smallButton: {
    flex: 0.3,
    margin: 0,
    flexDirection: 'column',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignSelf: 'stretch',
    shadowColor: '#555555',
    shadowOffset: {
        width: 10,
        height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 8,
  },
});
