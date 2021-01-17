import validator from "validator";

class Validator {
  validateEmail = (email) => {
    if (validator.isEmpty(email)) {
      return false;
    } else if (!validator.isEmail(email)) {
      return false;
    }
    return true;
  };

  validatePassword = (password) => {
    if (validator.isEmpty(password)) {
      return false;
    } else if (!validator.isLength(password, { min: 8 })) {
      return false;
    }
    return true;
  };

  validateName = (name) => {
    if (validator.isEmpty(name)) {
      return false;
    }
    return true;
  };
}

export default Validator;
