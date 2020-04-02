const Validator = require('validator');
const is_Empty = require('./isEmpty');

// 회원가입시 validation

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !is_Empty(data.name) ? data.name : '';
    data.email = !is_Empty(data.email) ? data.email : '';
    data.password = !is_Empty(data.password) ? data.password : '';
    data.password2 = !is_Empty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters';
    }




    if (Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: is_Empty(errors)
    };


};