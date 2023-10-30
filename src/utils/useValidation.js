import { useState } from 'react';

export const Field = {
  Email: 'Email',
  Name: 'Name',
  Password: 'Password',
};

function useValidation({ defaultNameIsValid = false, defaultEmailIsValid = false }) {
  const [emailIsValid, setEmailIsValid] = useState(defaultNameIsValid);
  const [nameIsValid, setNameIsValid] = useState(defaultEmailIsValid);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  function validateEmail(value) {
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(value)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }

  function validateName(value) {
    if (value !== '' && value.length > 2 && value.length < 11) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  }

  function validatePass(value) {
    if (value !== '' && value.length > 2 && value.length < 11) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  }

  const validate = (event, field) => {
    switch (field) {
      case Field.Email:
        validateEmail(event.target.value);
        break;
      case Field.Name:
        validateName(event.target.value);
        break;
      case Field.Password:
        validatePass(event.target.value);
        break;
      default:
        break;
    }
  };

  return {
    validate,
    emailIsValid,
    nameIsValid,
    passwordIsValid,
  };
}

export default useValidation;
