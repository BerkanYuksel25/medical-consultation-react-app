export function validateEmail(email) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexEmail.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  return password && password.length > 0;
}

export function validateNewPassword(password) {
  return password && password.length > 7;
}
