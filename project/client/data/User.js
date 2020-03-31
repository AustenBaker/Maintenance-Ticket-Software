import * as React from 'react';
import { Input, Text, Picker } from 'react-native';
import * as CONSTANTS from '../constants/Reference';

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
            user_type: props.user_type,
            note: props.note,
            edit_mode: props.edit_mode,
            tickets: []
        }
    }

    /**
     * Declare default values for User props in the event they
     * are not all passed into the constructor.
     */
    static defaultProps = {
        first_name: "John",
        last_name: "Doe",
        units: ["1703"],
        email: "default@CastlebergCommunities.com",
        phone: "000-000-0000",
        contact: "email",
        entry_permission: "accompanied",
        user_type: "resident",
        note: "",
        edit_mode: "false",
        tickets: []
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
        if (this.state.phone !== this.defaultProps.phone) {
            if (this.state.contact === 'email') {
                contact += "* Phone: ";
                contact += this.state.phone;
            } else {
                contact += " Phone: ";
                contact += this.state.phone;
                contact += "*";
            }
            contact += "\n* = Preferred contact method."
        }

        // create <Text> container for entry permission data
        var entry = "";
        if (this.state.entry_permission === "any") {
            entry = (
                <Text>
                    Entry: Allowed
                </Text>
            );
        } else if (this.state.entry_permission === "notify") {
            entry = (
                <Text>
                    Entry: Notify before entry.
                </Text>
            );
        } else entry = (
            <Text>
                Entry: Accompanied entry only.
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
              {entry}
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
        var checked = [];
        // check and store valid values in an array
        if ('first_name' in props && CONSTANTS.REGEX.NAME.exec(props.first_name)) {
            checked.push({['first_name']: props.first_name});
        }
        if ('last_name' in props && CONSTANTS.REGEX.NAME.exec(props.last_name)) {
            checked.push({['last_name']: props.last_name});
        }
        if ('email' in props && CONSTANTS.REGEX.EMAIL.exec(props.email)) {
            checked.push({['email']: props.email});
        }
        if ('phone' in props && CONSTANTS.REGEX.PHONE.exec(props.phone)) {
            checked.push({['phone']: props.phone});
        }
        if ('contact' in props && props.contact in CONSTANTS.PREFERRED_CONTACT) {
            checked.push({['contact']: props.contact});
        }
        if ('entry_permission' in props &&
          props.entry_permission in  CONSTANTS.ENTRY_PERMISSION){
            checked.push({['entry']: props.entry});
        }
        if ('note' in props) { // add REGEX check here for note
            checked.push({['note']: props.note});
        }
        
        // update server state and this.setState
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
        if (this.state.user_type === CONSTANTS.USER_TYPE[2]) {
            // need to implement this!
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
    isAuthorized(props) {
        let valid = false;
        return valid;
    }

    /**
     * This method generates the form to display when editing
     * User profile.
     * 
     * @returns React Native encoding to edit user profile
     */
    editUser = () => {
        // store React Native element encoding being generated for return
        let content;

        // store user profile modifications in progress before submission
        // set initial value to pre-existing user profile
        let profile = [];
        // read out current state values into profile until
        // users submit form.
        const [contact, setContact] = useState(CONSTANTS.PREFERRED_CONTACT[0]);
        const [entry, setEntry] = useState(CONSTANTS.ENTRY_PERMISSION[0]);
        content = (
            <form name="updateProfile">
              <Input
                label="First Name"
                defaultValue={this.state.first_name}
                keyboardType="default"
                maxLength="32"
                selectTextOnFocus="true"
                textContentType="name"
                autoCompleteType="name"
                errorMessage="This field is required."
                onSubmitEditing={fname => this.setState(first_name, fname)}
              />
              <Input
                label="Last Name"
                defaultValue={this.state.last_name}
                keyboardType="default"
                maxLength="32"
                selectTextOnFocus="true"
                textContentType="familyName"
                autoCompleteType="name"
                errorMessage="This field is required."
                onSubmitEditing={lname => this.setState(last_name, lname)}
              />
              <Input
                label="Email"
                defaultValue={this.state.email}
                keyboardType="email-address"
                maxLength="32"
                selectTextOnFocus="true"
                textContentType="emailAddress"
                autoCompleteType="email"
                errorMessage="This field is required.  Please enter valid email address."
                onSubmitEditing={emailAddr => this.setState(email, emailAddr)}
              />
              <Input
                label="Phone Number"
                defaultValue={this.state.phone}
                keyboardType="phone-pad"
                maxLength="12"
                selectTextOnFocus="true"
                textContentType="telephoneNumber"
                autoCompleteType="tel"
                errorMessage="Please enter valid phone number: ###-###-####"
                onSubmitEditing={phoneNum => this.setState(phone, phoneNum)}
              />
              <Picker
                label="Preferred Contact Method"
                selectedValue={contact}
                onValueChange={(itemValue, itemIndex) => setContact(itemValue)}
                errorMessage='This field is required.'
                >
                <Picker.Item
                    label='Email'
                    value={CONSTANTS.PREFERRED_CONTACT[0]}
                />
                <Picker.Item
                    label='Text'
                    value={CONSTANTS.PREFERRED_CONTACT[1]}
                />
              </Picker>
              <Picker
                label="Entry Permission"
                selectedValue={entry}
                onValueChange={(itemValue, itemIndex) => setEntry(itemValue)}
                errorMessage='This field is required.'
                >
                <Picker.Item
                    label='Allow accompanied entry.'
                    value={CONSTANTS.ENTRY_PERMISSION[0]}
                />
                <Picker.Item
                    title='Notify before entry.'
                    value={CONSTANTS.ENTRY_PERMISSION[1]}
                />
                <Picker.Item
                    title='Allow entry.'
                    value={CONSTANTS.ENTRY_PERMISSION[2]}
                />
              </Picker>
              <Input
                  label="Note"
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
        if (props.pwd !== undefined && CONSTANTS.REGEX.PASSWORD.exec(props.pwd)) {
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