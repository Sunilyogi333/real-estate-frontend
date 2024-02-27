function Validation(values) {
  let errors = {};
  //for username
  if (values.name === "") {
    errors.name = "(Empty Field)";
  } else if (values.name && values.name.trim().length === 0) {
    errors.name = "(Empty Field)";
  }


  //for email
  let email_pattern =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (values.email === "") {
    errors.email = "(Empty Field)";
  } else if (values.email && values.email.trim().length === 0) {
    errors.email = "(Empty Field)";
  }
   else if (!email_pattern.test(values.email)) {
    errors.email = "(Invalid Email)";
  } 

  //for password
  let password_pattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (values.password === "") {
    errors.password = "(Empty Field)";
  } else if (values.password && values.password.trim().length === 0) {
    errors.password = "(Empty Field)";
  }
   else if (!password_pattern.test(values.password)) {
    errors.password = "(Invalid Password)";
  } 

  return errors;
}

export default Validation;