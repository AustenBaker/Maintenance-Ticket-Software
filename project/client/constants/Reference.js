// REGEX constant
export const REGEX = {

    // username pattern:  8 to 32 alphabetical characters
    // also allow dash, period, underscore and @ connectors
    USERNAME: /^([a-zA-Z_]|[-\.@]){8,32}$/g,

    // name pattern: up to 32 ASCII alphabetical characters
    // also allow dash, period and space connectors
    NAME: /^([a-zA-Z]|[-\. ]){2,32}$/gi,

    // email pattern:  some(.name)*@site.com
    // where some name & site are any combination of letters
    // and numbers, and the site ends in a 2-3 letter/digit extension
    EMAIL: /^(([a-zA-Z0-9])+([\.-]{1}([a-zA-Z0-9])+)*@{1}([a-zA-Z0-9])+([\.-]{1}([a-zA-Z0-9])+)*\.{1}([a-zA-Z0-9]){2,5}){6,32}$/gi,

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

// Unit properties
export const UNIT_PROPERTIES = [
    'number',       // Unit number, unique to Property
    'property',     // Property to which unit belongs
]

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
    'userEmail',         // User email address
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
  let valid = validate('timestamp', timestamp);
  if (!valid) {
    // TODO: Better error handling
    alert("Invalid timestamp.")
    return null;
  }
  let time = new Date(timestamp);
  let hour = time.getHours();
  // convert hours from 0-23 to 1-12 AM/PM
  let morning = hour < 12;
  if (hour < 1) {
    hour = 12;
  }
  if (hour > 12) {
    hour -= 12;
  }
  let minutes = time.getMinutes;
  let seconds = time.getSeconds;
  result = (time.getMonth + 1) + '/' + time.getDate + '/' + time.getFullYear;
  result += ' ' + hour + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':';
  result += (seconds < 10 ? '0' + seconds : seconds) + (morning ? ' AM' : ' PM');
  return result;
};

const exists = (value) => {return !(value === undefined || value === null)}

const checkUsername = (value) => {return REGEX.USERNAME.test(value)}

const checkPassword = (value) => {return REGEX.PASSWORD.test(value)}

const checkName = (name) => {return REGEX.NAME.test(name)}

const checkEmail = (email) => {return REGEX.EMAIL.test(email)}

const checkPhone = (value) => {return REGEX.PHONE.test(value)}

const checkMemo = (memo) => {return REGEX.MEMO.test(memo)}

const checkUnit = (unit) => {
    return exists(unit) && Object.entries(unit).every((value) => (value in UNIT_PROPERTIES && validate(value, unit[value])));
}

const checkUnitList = (unitList) => {
    return exists(unitList) && unitList.every((unit) => checkUnit(unit));
}

const checkUnitNumber = (unitNumber) => {return REGEX.UNIT_NUMBER.test(unitNumber);}

const checkProperty = (location) => {return location in PROPERTY;}

const checkContact = (contact) => {return contact in PREFERRED_CONTACT;}

const checkEntry = (entry) => {return entry in ENTRY_PERMISSION;}

const checkUser = (user) => {
    return exists(user) && USER_PROPERTIES.every((value) in user) && Object.entries(user).every((key, value) => key in USER_PROPERTIES && isValid({type: key, data: value}))
}

const checkTicketUpdate = (ticketUpdate) => {
    return exists(ticketUpdate) && Object.entries(ticketUpdate).every((value) => value in TICKET_UPDATE_PROPERTIES && validate(value, ticketUpdate[value]));
}

const checkTicketUpdateList = (ticketUpdateList) => {
    return exists(ticketUpdateList) && ticketUpdateList.every((ticketUpdate) => checkTicketUpdate(ticketUpdate));
}

const checkTicket = (ticket) => {
    return exists(ticket) && Object.entries(ticket).every((value) => value in TICKET_PROPERTIES && validate(value, ticket[value]));
}

const checkTicketList = (ticketList) => {
    return exists(ticketList) && ticketList.every((ticket) => checkTicket(ticket));
}

const checkIdNumber = (idNumber) => {
    return exists(idNumber) && (idNumber > 0) && (idNumber < Number.MAX_SAFE_INTEGER);
}

const checkTimestamp = (value) => {
    return (value > ((-1) * DATE.MAX) && (value < DATE.MAX))
}

const checkTicketNumber = (value) => {
    return (value > 0) && (value < Number.MAX_SAFE_INTEGER);
}

const checkUserType = (value) => {return value in USER_TYPE;}

const checkStatus = (value) => {return value in STATUS;}

const checkBoolean = (value) => {return value in [true, false];}

const checkTicketViewMode = (value) => {return value in TICKET_VIEW;}

export const isValid = (item) => {
    let valid = exists(item) && 'type' in item && exists(item.type) && 'data' in item && exists(item.data);
    if (valid) {
        switch (item.type) {
            case 'user': {
                valid = checkUser(item.data);
                break;
            }
            case 'username': {
                valid = checkUsername(item.data);
                break;
            }
            case 'email', 'userEmail': {
                valid = checkEmail(item.data);
                break;
            }
            case 'ticket': {
                valid = checkTicket(item.data);
                break;
            }
            case 'tickets': {
                valid = checkTicketList(item.data);
                break;
            }
            case 'timestamp': {
                valid = checkTimestamp(item.data);
                break;
            }
            case 'ticket_updates': {
                valid = checkTicketUpdateList(item.data);
                break;
            }
            case 'ticketUpdate': {
                valid = checkTicketUpdate(item.data);
                break;
            }
            case 'note', 'memo', 'details', 'ticket_issue': {
                valid = checkMemo(item.data);
                break;
            }
            case 'first', 'last', 'ticket_issue_title': {
                valid = checkName(item.data);
                break;
            }
            case 'contactPreference': {
                valid = checkContact(item.data);
                break;
            }
            case 'entryPermission': {
                valid = checkEntry(item.data);
                break;
            }
            case 'property', 'location': {
                valid = checkProperty(item.data);
                break;
            }
            case 'number', 'unit_number': {
                valid = checkUnitNumber(item.data);
                break;
            }
            case 'ticket_number': {
                valid = checkTicketNumber(item.data);
                break;
            }
            case 'type': {
                valid = checkUserType(item.data);
                break;
            }
            case 'status': {
                valid = checkStatus(item.data);
                break;
            }
            case 'emergency', 'activate', 'edit_mode': {
                valid = checkBoolean(item.data);
                break;
            }
            case 'password': {
                valid = checkPassword(item.data);
                break;
            }
            case 'phone': {
                valid = checkPhone(item.data);
                break;
            }
            case 'ticket_view_mode': {
                valid = checkTicketViewMode(item.data);
                break;
            }
            case 'units': {
                valid = checkUnitList(item.data);
                break;
            }
            default: break;
        }
    }
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
        'userEmail': ((item) => {return checkEmail(item)}),
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
