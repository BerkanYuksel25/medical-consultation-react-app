export function validateEmail(email) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexEmail.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  return password && password.length > 0;
}

export function validateCode(code) {
  return code === "drnick";
}

export function validateNewPassword(password) {
  return password && password.length > 7;
}

export function getAge(birthday) {
  var age = Math.floor(
    (new Date() - new Date(birthday).getTime()) / 3.15576e10
  );
  if (age > 60) return 1;
  else return 0;
}

export function convertToONEZERO(value) {
  switch (value.toLowerCase().trim()) {
    case "yes":
    case "male":
      return 1;
    case "no":
    case "female":
      return 0;
    default:
      return -1;
  }
}
