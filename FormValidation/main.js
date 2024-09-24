const email = document.getElementById('email');
const emailError = document.querySelector('.emailerror');
const zip = document.getElementById('zipcode');
const zipError = document.querySelector('.zipcodeerror');
const countrySelector = document.getElementById('country');
let country = document.getElementById('country').value;
countrySelector.addEventListener('click', () => {
  country = countrySelector.value;
})

function checkEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = 'Please enter an email address.'
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Value needs to be a valid email address.'
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be ${email.minLength} characters long, you entered ${email.value.length}.`
  }
  emailError.className = 'error active'
}

email.addEventListener('input', (event) => {
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = 'error'
    email.classList.remove('submitCheck');
  } else {
    checkEmailError();
  }
})

zip.addEventListener('input', (event) => {
  checkZIP();
})

function checkZIP() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
    us: [
      "^(US-)?\\d{5}$",
      "USA ZIPs must have exactly 5 digits.",
    ],
  }
  const constraint = new RegExp(constraints[country][0], '');
  if (constraint.test(zip.value)) {
    zipError.textContent = '';
    zipError.className = 'error'
    zip.classList.remove('submitCheck');
  } else {
    zipError.textContent = (constraints[country][1]);
    zipError.className = 'error active'
  }
};


const passwordField = document.getElementById('password');
const passwordError = document.querySelector('.passworderror');

function checkPassword() {
  if (passwordField.validity.valueMissing) {
    passwordError.textContent = 'Please input a password'
  } else if (passwordField.validity.tooShort) {
    passwordError.textContent = `Password should be ${passwordField.minLength} characters long, you entered ${passwordField.value.length}.`
  }
  passwordError.className = 'error active'
}

passwordField.addEventListener('input', () => {
  if (passwordField.validity.valid) {
    passwordError.textContent = '';
    passwordError.className = 'error'
    passwordField.classList.remove('submitCheck');
  } else {
    checkPassword();
  }
})

const passwordConfirm = document.getElementById('password-confirm');
const pwcError = document.querySelector('.pwconfirmerror');

passwordConfirm.addEventListener('input', () => {
  if (passwordField.validity.valid && passwordConfirm.validity.valid) {
    pwcError.textContent = '';
    pwcError.className = 'error'
    passwordConfirm.classList.remove('submitCheck');
  } else {
    confirmPassword()
  }
})
function confirmPassword() {
  if (passwordConfirm.validity.valueMissing) {
    pwcError.textContent = 'Please confirm previous password'
  } else if (passwordConfirm.value !== passwordField.value) {
    pwcError.textContent = 'Passwords do not match.'
  }
  pwcError.className = 'error active'
}

const formSubmit = document.getElementById('form');
formSubmit.addEventListener('submit', () => {
  event.preventDefault();
  const inputFields = document.querySelectorAll('.submitCheck')
  if (inputFields.length === 0) {
    alert('Congrats! Form is fully validated')
  } else {
    alert('Form not fully validated');
  }
})



