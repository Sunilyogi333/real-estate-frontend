function Validation(values) {
    let errors = {};

    //check username is empty
    if (!values.username) {
        errors.username = "required";
    }

       //check phoneNumber is empty
       if (!values.phoneNumber) {
        errors.phoneNumber = "required";
    }
    else if (values.phoneNumber && values.phoneNumber.length !== 10) {
        errors.phoneNumber = "invalid phone number";
    }

  
    return errors;
  }
  
  export default Validation;