// REGEX constant
export const REGEX = {

    // name pattern: up to 32 ASCII alphabetical characters
    // also allow dash, period and space connectors
    NAME: /^([a-zA-Z]|[-\. ]){2,32}$/gi,

    // email pattern:  some(.name)*@site.com
    // where some name & site are any combination of letters
    // and numbers, and the site ends in a 2-3 letter/digit extension
    EMAIL: /^(([a-zA-Z0-9])+([\.-]{1}([a-zA-Z0-9])+)*[@]{1}([a-zA-Z0-9])+([\.-]{1}([a-zA-Z0-9])+)*\.{1}([a-zA-Z0-9]){2,5}){6,32}$/gi,

    // phone pattern:  ###-###-#### where # is a digit 0-9
    PHONE: /^\(?([0-9]{3})\)?[-\. ]?([0-9]{3})[-\. ]?([0-9]{4})$/gi,

    // password pattern: a-zA-Z0-9_-^@$!%*#?&
    // allow use of: uppercase or lowercase letter, number, punctuation
    // length of 8-64 characters
    PASSWORD: /^([a-zA-Z0-9]|[-!@#\$%\^&\*\(\)_\+=]){8,64}$/g,


    // memo pattern: a-zA-Z0-9_-+=!?.,;:()&
    // allows any combination of letters, digits and select punctuation
    // length up to 255 characters
    MEMO: /^([a-zA-Z0-9]|[-!@#\$%\^&\*\(\)_\+=\?\.,;: ]){0,255}$/gi,

    // unit number pattern: a-zA-Z0-9_-
    // allows any combination of ASCII alphabetic characters, digits, underline and dashes
    UNIT_NUMBER: /^([a-zA-Z0-9]|[- ]){1,32}$/gi,
};

// User property list
export const USER_PROPERTIES = [
    'username', // String, 1-32 char
    'password', // String, 8-32 char, see constants/Reference.js REGEX.PASSWORD for patterns
    'first', // String, 0-32 char
    'last', // String, 0-32 char
    'units', // Array of units {Property, unitNumber}, see constants/Reference.js PROPERTY for Properties
    'email', // String, see constants/Reference.js REGEX.EMAIL for pattern
    'phone', // String, see constants/Reference.js REGEX.PHONE for pattern ###-###-####
    'contactPreference', // String, see constants/Reference.js PREFERRED_CONTACT
    'entryPermission', // String, see constants/Reference.js ENTRY_PERMISSION
    'type', // String, see constants/Reference.js USER_TYPE
    'note', // String, 0-255 char, see constants/Reference.js REGEX.MEMO for pattern
    'tickets', // Array of Numbers (Ticket Id Numbers)
    'activate' // Boolean
];

// User type options
export const USER_TYPE = {
    RES: 'resident',
    MNT: 'maintenance',
    MGMT: 'management'
};

// User entry permissions
export const ENTRY_PERMISSION = {
    ACC: 'accompanied',
    NOT: 'notify',
    ANY: 'any'
};

// User preferred contact method
export const PREFERRED_CONTACT = {
    EMAIL: 'email',
    TXT: 'text'
};

// Properties managed
export const PROPERTY = {
    WSP: 'Whispering Pines',
    RH: 'Richmond Hills',
    SA: 'Stoughton Arms',
    LAA: 'Lincoln Avenue Apartments',
    TAW: 'Tuc-A-Way Apartments'
};

export const TICKET_UPDATE_PROPERTIES = [
    'timestamp',    // Number Date timestamp
    'user',         // User email address
    'details',      // Details updating Ticket status
];

// Ticket status
export const STATUS = {
    OPEN: 'Open ticket',
    CLOSED: 'Closed ticket'
};

export const EMERGENCY = {
    NO: 'No emergency',
    YES: 'Yes emergency'
};

// Ticket view modes
export const TICKET_VIEW = {
    'DETAIL': 0,
    'UPDATE': 1,
    'LIST': 2,
    'NEW': 3,
    'NORMAL': 4,
};

// Ticket properties
export const TICKET_PROPERTIES = [
    'ticket_number', // Number, unique identifier
    'timestamp', // Number, time of ticket creation
    'status', // String, open/closed
    'location',  // PROPERTY to which unit belongs
    'unit_number', // String, unit number
    'email', // String, see constants/Reference.js REGEX.EMAIL for pattern
    'emergency', // boolean value, true if emergency
    'ticket_issue_title', // String, 8-32 characters
    'ticket_issue', // String, 8-255 characters
    'ticket_updates',
];

export const DATE = {
    'MAX': 8640000000000000,
    'WEEK': 604800000, // 7 days x 24 hours x 60 minutes x 60 seconds x 1000 milliseconds
};

/**
 * Converts numerical Date value into string representation, returning
 * current timestamp value if no value passed.
 *
 * @param {Number} timestamp Numerical timestamp value
 *
 * @returns {String} D/M/YYYY H:MM:SS AM/PM date format String
 */
export const readableTimestamp = (timestamp = Date.now()) => {
    let result = null;
    if (timestamp > DATE.MAX || timestamp < (-DATE.MAX)) {
        // invalid timestamp value
        // TODO: throw error rather than returning null
        return result;
    }
    let time = new Date(timestamp);
    let morning = false;
    let hour = time.getHours();
    // convert hours from 0-23 to 1-12 AM/PM
    if (hour < 12) {
        morning = true;
    }
    if (hour < 1) {
        hour = 12;
    }
    if (hour > 12) {
        hour -= 12;
    }
    let month = time.getMonth() + 1;
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    result = month + '/' + time.getDate() + '/' + time.getFullYear() + ' ';
    result += hour + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':';
    result += (seconds < 10 ? '0' + seconds : seconds) + (morning ? ' AM' : ' PM');
    return result;
}

const checkName = (name) => {return REGEX.NAME.test(name)}

const checkEmail = (email) => {return REGEX.EMAIL.test(email)}

const checkMemo = (memo) => {return REGEX.MEMO.test(memo)}

const checkUnit = (unit) => {
    let valid = !(unit === undefined || unit === null);
    for (let value of TICKET_UPDATE_PROPERTIES) {
      valid = valid && (value in unit) && validate(value, unit[value]);
    }
    return valid;
}

const checkUnitList = (unitList) => {
    let valid = !(unitList === undefined || unitList === null);
    for (let unit of unitList) {
        valid = valid && checkUnit(unit);
    }
    return valid;
}

const checkTicketUpdate = (ticketUpdate) => {
    let valid = !(ticketUpdate === undefined || ticketUpdate === null);
    for (let value of TICKET_UPDATE_PROPERTIES) {
        valid = valid && (value in ticketUpdate) && validate(value, ticketUpdate[value]);
    }
    return valid;
}

const checkTicketUpdateList = (ticketUpdateList) => {
    let valid = !(ticketUpdateList === undefined || ticketUpdateList === null);
    for (let ticketUpdate of ticketUpdateList) {
        valid = valid && checkTicketUpdate(ticketUpdate);
    }
    return valid;
}

const checkTicket = (ticket) => {
    let valid = !(ticket === undefined || ticket === null);
    for (let value of TICKET_PROPERTIES) {
        valid = valid && (value in ticket) && validate(value, ticket[value]);
    }
    return valid;
}

const checkTicketList = (ticketList) => {
    let valid = !(ticketList === undefined || ticketList === null);
    for (let ticket of ticketList) {
        valid = valid && checkTicket(ticket);
    }
    return valid;
}

const checkIdNumber = (idNumber) => {
    let valid = !(idNumber === undefined || idNumber === null)
      && (idNumber > 0) && (idNumber < Number.MAX_SAFE_INTEGER);
    return valid;
}

/**
 *
 * @param {String} property
 * @param {*} value
 */
export const validate = (property, value) => {
    let valid = false;
    let validator = {
        'ticket_number': ((item) => {return checkIdNumber(item)}),
        'timestamp': ((item) => {return item < DATE.MAX && item > ((-1) * DATE.MAX)}),
        'status': ((item) => {return item in STATUS}),
        'location': ((item) => {return item in PROPERTY}),
        'unit_number': ((item) => {return REGEX.UNIT_NUMBER.test(item)}),
        'email': ((item) => {return checkEmail(item)}),
        'username': ((item) => {return checkEmail(item)}),
        'user': ((item) => {return checkEmail(item)}),
        'emergency': ((item) => {return item in [true, false]}),
        'activate': ((item) => {return item in [true, false]}),
        'edit_mode': ((item) => {return item in [true, false]}),
        'ticket_issue': ((item) => {return checkMemo(item)}),
        'note': ((item) => {return checkMemo(item)}),
        'details': ((item) => {return checkMemo(item)}),
        'first': ((item) => {return checkName(item)}),
        'last': ((item) => {return checkName(item)}),
        'ticket_issue_title': ((item) => {return checkName(item)}),
        'password': ((item) => {return REGEX.PASSWORD.test(item)}),
        'phone': ((item) => {return REGEX.PHONE.test(item)}),
        'type': ((item) => {return item in USER_TYPE}),
        'entryPermission': ((item) => {return item in ENTRY_PERMISSION}),
        'contactPreference': ((item) => {return item in PREFERRED_CONTACT}),
        'ticket_view_mode': ((item) => {return item in TICKET_VIEW}),
        'units': ((item) => {return checkUnitList(item)}),
        'ticket_updates': ((item) => {return checkTicketUpdateList(item)}),
        'tickets': ((item) => {return checkTicketList(item)}),
    };

    if (property in validator) {
        valid = validator[property](value);
    }


    return valid;
}