import { extendObservable } from 'mobx';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

export class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            loggedIn: false,
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
