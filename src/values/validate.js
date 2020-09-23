
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateEmail(emailId) {
  // if (emailId.length === 0) {
  if (emailId.length === 0 || emailId.length < 10 || emailId.length > 50) {
    return false;
  }

  regex = /^[A-Za-z]([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  pattern = regex;
  if (!pattern.test(emailId)) {
    return false;
  } else {
    strEmail = emailId.substring(emailId.indexOf("@") + 1, emailId.length);
    reversed = strEmail.split("").join("");
    str = reversed.split(".");
    if (str.length !== undefined && str.length > 1 && str.length < 4) {
      if (str.length === 2) {
        //gmail.com
        if (str[0].length > 1 && str[1].length > 1 && str[1].length < 4) {
          return true;
        } else {
          return false;
        }
      } else if (str.length === 3) {
        //gmail.com.com
        if (
          str[0].length > 1 &&
          str[1].length > 1 &&
          str[1].length < 4 &&
          str.length > 2 &&
          str[2] !== undefined &&
          str[2].length > 1 &&
          str[2].length < 4
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return false;
}


export function validatePassword(password) {
  if (password.length < 4) {
    return false
  }
  if (password.length > 10) {
    return false
  }
  else{
    return true
  }
  // var pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/;
    //return pass.test(password) ? true :true;
}

export const validateMobNum = number => {
  const re = /^[0][5-9]\d{9}$|^[5-9]\d{9}$/;
  const mFormat = /([0-9]).*?\1{9,}/; // duplicate digit check || 9 duplicate digits are allowed to enter
  const whiteSpace = /^\s+$/; // Avoid space
  return re.test(number) && !mFormat.test(number) && !whiteSpace.test(number)
    ? true
    : false; 
};



export const validateName =text => {
  var regex = new RegExp(`^[a-zA-z]`);
  return regex.test(text) ? true :false;
};

