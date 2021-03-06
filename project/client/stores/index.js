import { extendObservable } from 'mobx';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import * as CONSTANTS from '../constants/Reference';

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            loggedIn: false,
            username: '',
            first: '',
            last: '',
            units: [],
            email: '',
            phone: '',
            contactPreference: CONSTANTS.PREFERRED_CONTACT.EMAIL,
            entryPermission: CONSTANTS.ENTRY_PERMISSION.ACC,
            type: CONSTANTS.USER_TYPE.RES,
            note: '',
            tickets: [],
            activate: false
            /* Add new global states here */
        });
    }
}

class TicketStore {
    constructor() {
        extendObservable(this, {
          id: '',
          email: '',
          aptComplex: '',
          unit: '',
          issue: '',
          emergency: '',
          resolvedTime: '',
          progress: '',
          closed: '',
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
