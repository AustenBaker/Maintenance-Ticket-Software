import { extendObservable } from 'mobx';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import * as CONSTANTS from '../constants/Reference';

export class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            loggedIn: false,
            username: '',
            pwdHash: '',
            firstName: '',
            lastName: '',
            userType: CONSTANTS.USER_TYPE.RES,
            contact: { pref: CONSTANTS.PREFERRED_CONTACT.EMAIL, value: ''},
            ticketList: []
            /* Add new global states here */
        });
    }
}

export class TicketStore {
    constructor() {
        extendObservable(this, {
            /* Add new global states here */
        });
    }
}

export class ColorScheme {
  constructor() {
    extendObservable(this, {
      theme: Appearance.getColorScheme(),
    });
  }
}
