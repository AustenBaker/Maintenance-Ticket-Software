import { extendObservable } from 'mobx';

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
