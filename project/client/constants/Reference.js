// REGEX constant
export const REGEX = {

    // name pattern: up to 32 ASCII alphabetical characters
    NAME: /^[[a-zA-Z]+[\. -]?]{1,32}$/,

    // email pattern:  some(.name)*@site.com
    // where some name & site are any combination of letters
    // and numbers, and the site ends in a 2-3 letter/digit extension
    EMAIL: /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+){6,32}$/,

    // phone pattern:  ###-###-#### where # is a digit 0-9
    PHONE: /^\(?([0-9]{3})\)?[-\. ]?([0-9]{3})[-\. ]?([0-9]{4})$/,

    // password pattern: a-zA-Z0-9_-!@#$%^&*+=
    // requires at least one each: uppercase letter, number, punctuation
    // length of 8-32 characters
    // password must pass all REGEX.PASSWORD.exec(password)
    // pattern matcher tests to be valid (total: 4)
    PASSWORD: [/^[[\w]*[A-Z]*[\d]*[-\.!@#$%\^\*\+=]*]{8,32}$/,
        /[A-Z]+/,
        /[\d]+/,
        /[-!@#$%\^\*\+=]+/
    ],

    // memo pattern: a-zA-Z0-9_-+=!?.,;:()&
    // allows any combination of letters, digits and select punctuation
    // length up to 255 characters
    MEMO: /^[[\w]*[-\+=!\?\.,;:\(\)&]?]{,255}$/
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
    'details'       // Details updating Ticket status
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
    result = month + '/';
    result += time.getDate() + '/';
    result += time.getFullYear() + ' ';
    result += hour + ':';
    result += (minutes < 10 ? '0' + minutes : minutes) + ':';
    result += (seconds < 10 ? '0' + seconds : seconds) + (morning ? ' AM' : ' PM');
    return result;
}


export const validate = (property, value) => {
    let valid = false;
    let validator = {
        'ticket_number': ((item) => {return (/^[\d+]{1,32}$/).test(item)}),
        'timestamp': ((item) => {return item < DATE.MAX && item > ((-1) * DATE.MAX)}),
        'status': ((item) => {return item in STATUS}),
        'location': ((item) => {return item in PROPERTY}),
        'unit_number': ((item) => {return (/^[\w+]{1,32}$/).test(item)}),
        'email': ((item) => {return REGEX.EMAIL.test(item)}),
        'username': ((item) => {return REGEX.EMAIL.test(item)}),
        'user': ((item) => {return REGEX.EMAIL.test(item)}),
        'emergency': ((item) => {return item in [true, false]}),
        'activate': ((item) => {return item in [true, false]}),
        'edit_mode': ((item) => {return item in [true, false]}),
        'ticket_issue': ((item) => {return REGEX.MEMO.test(item)}),
        'note': ((item) => {return REGEX.MEMO.test(item)}),
        'details': ((item) => {return REGEX.MEMO.test(item)}),
        'first': ((item) => {return REGEX.NAME.test(item)}),
        'last': ((item) => {return REGEX.NAME.test(item)}),
        'ticket_issue_title': ((item) => {return REGEX.NAME.test(item)}),
        'password': ((item) => {return REGEX.PASSWORD.test(item)}),
        'phone': ((item) => {return REGEX.PHONE.test(item)}),
        'type': ((item) => {return item in USER_TYPE}),
        'entryPermission': ((item) => {return item in ENTRY_PERMISSION}),
        'contactPreference': ((item) => {return item in PREFERRED_CONTACT}),
        'ticket_view_mode': ((item) => {return item in TICKET_VIEW}),
        'units': ((item) => {
            let fail = false;
            for (let unit in item) {
              fail = fail || !('number' in unit) || !('property' in unit)
                || !(unit.property in PROPERTY) || !validate('unit_number', unit.number);
            }
            return !fail;
          }),
        'ticket_updates': ((item) => {
            let fail = false;
            for (let tUpdate in item) {
                for (let key in TICKET_UPDATE_PROPERTIES) {
                    fail = fail || !(key in tUpdate) || !validate(key, tUpdate[key]);
                }
            }
            return !fail;
        }),
    };

    if (property in validator) {
        console.log(property)
        valid = validator[property](value);
    }

    return valid;
}