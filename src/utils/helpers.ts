import validator from 'validator';

class Helper {
    validateEmail = (email: string) => {
        return validator.isEmail(email);
    }
    validatePassword = (password: string) => {
        return validator.isStrongPassword(password);
    }
    validateUsername = (username: string) => {
        return validator.isLowercase(username) && /^[a-zA-Z0-9_]*$/.test(username);
    }
}

const helpers = new Helper();
export default helpers;