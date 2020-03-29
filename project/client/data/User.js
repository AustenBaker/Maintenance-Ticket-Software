import * as React from 'react';
import { FormInput, Text } from 'react-native';

// REGEX constant 
const REGEX = {
    // name pattern: up to 32 ASCII alphabetical characters
    NAME: /^[a-zA-Z]{1,32}$/,
    // email pattern:  some(.name)*@site.com
    // where some name & site are any combination of letters
    // and numbers, and the site ends in a 2-3 letter/digit extension
    EMAIL: /^[[\w]+[\.\w]*@[\w]+\.[\w]{2,3}]{6,32}$/,
    // phone pattern:  ###-###-#### where # is a digit 0-9
    PHONE: /^[\d]{3}-[\d]{3}-[\d]{4}$/,
    // password pattern: a-zA-Z0-9_-!@#$%^&*+=
    // requires at least one each: uppercase letter, number, punctuation
    // length of 8-32 characters
    PASSWORD: /^[[\w]*[A-Z]+[\d]+[\-!@#$%\^\*\+=]+]{8,32}$/
}

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: props.first_name,
            last_name: props.last_name,
            units: [...props.units],
            email: props.email,
            phone: props.phone,
            contact: props.contact,
            entry_permission: props.entry_permission,
            note: props.note,
            edit_mode: false,
            tickets: []
        }
        this.handleEvent = this.handleEvent.bind(this);
    }

    /**
     * This method generates the <View> to display the
     * user information.
     * 
     * @returns React Native encoding for user display
     */
    displayUser = () => {
        var content;
        
        // if phone number exists, create text output
        // and add star to user's preferred contact type
        var contact = this.state.email;
        if (this.state.phone !== undefined) {
            if (this.state.contact === 'email') {
                contact += "* Phone: ";
                contact += this.state.phone;
            } else {
                contact += " Phone: ";
                contact += this.state.phone;
                contact += "*";
            }
        }

        // if note exists, create a <Text> container for it
        var note = "";
        if (this.state.note !== undefined) {
            note = (
                <Text>
                  {"Note: \n"}
                  {this.state.note}
                </Text>
            );
        }

        // label & put user info into a <View><Text> wrapper
        // for display
        content = (
            <View>
              <Text>
                Name:
                {this.state.first_name}
                {this.state.last_name}
              </Text>
              <Text>
                Email:
                {contact}
              </Text>
              {note}
            </View>
          );
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
            if (unit in this.state.units === 'false') {
                this.setState(units, [...this.state.units, unit]);
            }
        }
    }

    /**
     * This method updates user information.
     * Allows update for all user data except password.
     * 
     * @param first_name User first name
     * @param last_name User last name
     * @param email User email address
     * @param phone User phone number (optional)
     * @param contact User preferred contact method (email/text)
     * @param entry_permission User entry preference
     * @param note Note from user regarding special circumstances
     * 
     * @returns true if updated successfully
     */
    update = (props) => {
        var updated = false;
        var checked = {};
        if ('first_name' in props && REGEX[NAME].exec(props.first_name)) {
            checked = {first_name: props.first_name};
        }
        if ('last_name' in props && REGEX[NAME].exec(props.last_name)) {
            checked = {...checked, last_name: props.last_name};
        }
        if ('email' in props && REGEX[EMAIL].exec(props.email)) {
            checked = {...checked, email: props.email};
        }
        if ('phone' in props && REGEX[PHONE].exec(props.phone)) {
            checked = {...checked, phone: props.phone};
        }
        if ('contact' in props && props.contact in ['email', 'text']) {
            checked = {...checked, contact: props.contact};
        }
        if ('entry_permission' in props &&
            props.entry_permission in ['any','notify','accompanied']){
            checked = {...checked, entry: props.entry};
        }
        if ('note' in props) { // add REGEX check here for note
            checked = {...checked, note: props.note};
        }
        return updated;

    }

    /**
     * This method generates the form to display when editing
     * User profile.
     * 
     * @returns React Native encoding to edit user profile
     */
    editUser = () => {
        var content;
        const contact = 'email';
        const entry = 'accompanied';
        content = (
            <form name="updateProfile">
              <FormLabel>First Name</FormLabel>
              <FormInput
                  onSubmitEditing={fname => this.setState(first_name, fname)}
                  defaultValue={this.state.first_name}
                  keyboardType="default"
                  maxLength="32"
                  selectTextOnFocus="true"
                  textContentType="name"
                  autoCompleteType="name"
              />
              <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
              <FormLabel>Last Name</FormLabel>
              <FormInput
                  onSubmitEditing={lname => this.setState(last_name, lname)}
                  defaultValue={this.state.last_name}
                  keyboardType="default"
                  maxLength="32"
                  selectTextOnFocus="true"
                  textContentType="familyName"
                  autoCompleteType="name"
              />
              <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
              <FormLabel>Email</FormLabel>
              <FormInput
                  onSubmitEditing={emailAddr => this.setState(email, emailAddr)}
                  defaultValue={this.state.email}
                  keyboardType="email-address"
                  maxLength="32"
                  selectTextOnFocus="true"
                  textContentType="emailAddress"
                  autoCompleteType="email"
              />
              <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
              <FormLabel>Phone Number</FormLabel>
              <FormInput
                  onSubmitEditing={phoneNum => this.setState(phone, phoneNum)}
                  defaultValue={this.state.phone}
                  keyboardType="phone-pad"
                  maxLength="12"
                  selectTextOnFocus="true"
                  textContentType="telephoneNumber"
                  autoCompleteType="tel"
              />
              <FormValidationMessage>{'Please enter phone number: ###-###-####'}</FormValidationMessage>
              <FormLabel>Preferred Contact</FormLabel>
              <FormInput>
                  <CheckBox 
                      checkedTitle='Email preferred'
                      title='Email'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={contact === 'email'}
                      onIconPress={contact = 'email'}
                  />
                  <CheckBox 
                      checkedTitle='Text preferred'
                      title='Text'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={contact === 'text'}
                      onIconPress={contact = 'text'}
                  />
              </FormInput>
              <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
              <FormInput>
                  <CheckBox 
                      title='Allow entry.'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={entry === 'any'}
                      onIconPress={entry = 'any'}
                  />
                  <CheckBox 
                      title='Notify before entry.'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={entry === 'notify'}
                      onIconPress={entry = 'notify'}
                  />
                  <CheckBox 
                      title='Allow accompanied entry.'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={entry === 'accompanied'}
                      onIconPress={entry = 'accompanied'}
                  />
              </FormInput>
              <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
              <FormLabel>Note</FormLabel>
              <FormInput
                  onSubmitEditing={someNote => this.setState(note, someNote)}
                  defaultValue={this.state.note}
                  keyboardType="default"
                  maxLength="256"
                  selectTextOnFocus="true"
              />
            </form>
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
        var content = [];
        if (props.filter === undefined || props.filter === 'none') {
            content = this.state.tickets;
        } else if (props === 'open') {
            // generates list of user's tickets that are open
            for (let ticket of this.state.tickets) {
                if (ticket.isOpen()) {
                    content.push(ticket);
                }
            }
        } else if (props === 'closed') {
            // generates list of user's tickets that are closed
            for (let ticket of this.state.tickets) {
                if (!ticket.isOpen()) {
                    content.push(ticket);
                }
            }
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
        if (props.pwd !== undefined && REGEX[PASSWORD].exec(props.pwd)) {
            // process password update
        }
        return updated;
    }

    /**
     * This method renders the User element on the client device.
     * 
     * @returns React Native encoding for User element display.
     */
    render = () => {
        var content;
        if (this.state.editMode===false){
            // if not in edit mode, simply display user info
            content=this.displayUser();
        } else {
            // if in edit mode, display form for user info update
            content=this.editUser();
        }
        return (content);
    }
}