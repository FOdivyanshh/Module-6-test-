const usernameEl = document.querySelector('#username');
const usernameE2 = document.querySelector('#lastname');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#register');

const checkUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, 'please enter a  valid first name.');
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameEl, `First Name must be  At least ${min}  characters.`);
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};
const checklastUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const lastname = usernameE2.value.trim();

  if (!isRequired(lastname)) {
    showError(usernameE2, 'please enter a  valid last name.');
  } else if (!isBetween(lastname.length, min, max)) {
    showError(usernameE2, ` Last Name must be  At least ${min}  characters.`);
  } else {
    showSuccess(usernameE2);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, 'Email cannot be blank.');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'please enter a valid email address.');
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isRequired = (value) => (value === '' ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove('success');
  formField.classList.add('error');

  // show the error message
  const error = formField.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove('error');
  formField.classList.add('success');

  // hide the error message
  const error = formField.querySelector('small');
  error.textContent = '';
};

form.addEventListener('submit', function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    islastUsernameValid = checklastUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    islastUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  'input',
  debounce(function (e) {
    switch (e.target.id) {
      case 'username':
        checkUsername();
        break;
      case 'lastname':
        checklastUsername();
        break;
      case 'email':
        checkEmail();
        break;
      case 'password':
        checkPassword();
        break;
      case 'confirm-password':
        checkConfirmPassword();
        break;
    }
  })
);

function validatePhoneNumber(input_str) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
}

function validateForm(event) {
  var phone = document.getElementById('myform_phone').value;
  if (!validatePhoneNumber(phone)) {
    document.getElementById('phone_error').classList.remove('hidden');
  } else {
    document.getElementById('phone_error').classList.add('hidden');
    alert('validation success');
  }
  event.preventDefault();
}

document.getElementById('register').addEventListener('submit', validateForm);
$(function () {
  $('#register').validate({
    rules: {
      gender: { required: true },
    },
    messages: {
      gender: {
        required: 'Please select a gender<br/>',
      },
    },
    errorPlacement: function (error, element) {
      if (element.is(':radio')) {
        error.appendTo(element.parents('.container'));
      } else {
        // This is the default behavior
        error.insertAfter(element);
      }
    },
  });
});
