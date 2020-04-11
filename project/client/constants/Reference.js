// REGEX constant 
export const REGEX = {

    // name pattern: up to 32 ASCII alphabetical characters
    NAME: /^[a-zA-Z]{1,32}$/,
    
    // email pattern:  some(.name)*@site.com
    // where some name & site are any combination of letters
    // and numbers, and the site ends in a 2-3 letter/digit extension
    EMAIL: /^[[\w]+[\.\w]*@{1}[[\w]+\.{1}]+[\w]{2,3}]{6,32}$/,

    // phone pattern:  ###-###-#### where # is a digit 0-9
    PHONE: /^[\d]{3}-[\d]{3}-[\d]{4}$/,

    // password pattern: a-zA-Z0-9_-!@#$%^&*+=
    // requires at least one each: uppercase letter, number, punctuation
    // length of 8-32 characters
    PASSWORD: /^[[\w]*[A-Z]+[\d]+[\-!@#$%\^\*\+=]+]{8,32}$/,

    // memo pattern: a-zA-Z0-9_-+=!?.,;:()&
    // allows any combination of letters, digits and select punctuation
    // length up to 255 characters
    MEMO: /^[[\w]*[\-\+=!\?.,;:/(/)&]?]{,255}$/
}

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
}
