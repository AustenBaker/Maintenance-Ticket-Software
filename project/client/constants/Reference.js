// REGEX constant 
export const REGEX = {

    // name pattern: up to 32 ASCII alphabetical characters
    NAME: /^[a-zA-Z\-]{1,32}$/,
    
    // email pattern:  some(.name)*@site.com
    // where some name & site are any combination of letters
    // and numbers, and the site ends in a 2-3 letter/digit extension
    EMAIL: /^([\w\-\.]+)@([\w\-\.]+)\.([a-zA-Z]{2,5})$/,

    // phone pattern:  ###-###-#### where # is a digit 0-9
    PHONE: /^[\d]{3}-[\d]{3}-[\d]{4}$/,

    // password pattern: a-zA-Z0-9_-!@#$%^&*+=
    // requires at least one each: uppercase letter, number, punctuation
    // length of 8-32 characters
    // password must pass all REGEX.PASSWORD.exec(password)
    // pattern matcher tests to be valid (total: 4)
    PASSWORD: [/^[[\w]*[A-Z]*[\d]*[\-!@#$%\^\*\+=]*]{8,32}$/,
        /[A-Z]+/,
        /[\d]+/,
        /[\-!@#$%\^\*\+=]+/
    ],

    // memo pattern: a-zA-Z0-9_-+=!?.,;:()&
    // allows any combination of letters, digits and select punctuation
    // length up to 255 characters
    MEMO: /^[[\w]*[\-\+=!\?\.,;:/(/)&]?]{,255}$/
}
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

// Ticket status
export const STATUS = {
    OPEN: 'Open ticket',
    CLOSED: 'Closed ticket'
};

export const EMERGENCY = {
    NO: 'No emergency',
    YES: 'Yes emergency'
};
