import { extendObservable } from 'mobx';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import * as CONSTANTS from '../constants/Reference';

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            loggedIn: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            contact: CONSTANTS.PREFERRED_CONTACT.EMAIL,
            entry: CONSTANTS.ENTRY_PERMISSION.ACC,
            userType: CONSTANTS.USER_TYPE.RES,
            note: '',
            units: [],
            ticketList: []
            /* Add new global states here */
        });
    }
}

class TicketStore {
    constructor() {
        extendObservable(this, {
          ticket_number: '',
          timestamp: '',
          status: '',
          location: '',
          unit_number: '',
          emergency: '',
          ticket_updates: [],
            /* Add new global states here */
        });
    }
}

class ColorScheme {
  constructor() {
    extendObservable(this, {
      theme: Appearance.getColorScheme(),
    });
  }
}

const userStore = new UserStore();
const ticketStore = new TicketStore();
const colorScheme = new ColorScheme();

export {
  userStore, ticketStore, colorScheme
}
