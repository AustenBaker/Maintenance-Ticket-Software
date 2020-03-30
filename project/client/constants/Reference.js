// REGEX constant 
export const REGEX = {
    // name pattern: up to 32 ASCII alphabetical characters
    NAME: /^[a-zA-Z]{1,32}$/,
    // email pattern:  some(.name)*@site.com
    // where some name & site are any combination of letters
    // and numbers, and the site ends in a 2-3 letter/digit extension
    EMAIL: /^[[\w]+[\.\w]*@[\w]+\.[\w]{2,3}]{6,32}$/,
    // phone pattern:  ###-###-#### where # is a digit 0-9
    PHONE: /^[\d]{3}-[\d]{3}-[\d]{4}$/,
    // password pattern: a-zA-Z0-9_-!@#$%^&*+=
    // requires at least one each: uppercase letter, number, punctuation
    // length of 8-32 characters
    PASSWORD: /^[[\w]*[A-Z]+[\d]+[\-!@#$%\^\*\+=]+]{8,32}$/
}


export const USER_TYPE = ['resident','maintenance','management'];
export const ENTRY_PERMISSION = ['accompanied','notify','any'];
export const PREFERRED_CONTACT = ['email','text'];

