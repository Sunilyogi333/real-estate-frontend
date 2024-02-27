function Validation(values) {
    let errors = {};

    // Check if firstName is empty
    if (!values.firstName) {
        errors.firstName = "required";
    } else if (values.firstName && values.firstName.trim().length === 0) {
        errors.firstName = "(required)";
      }

    // Check if lastName is empty
    if (!values.lastName) {
        errors.lastName = "required";
    } else if (values.lastName && values.lastName.trim().length === 0) {
        errors.lastName = "(required)";
      }

    // Check if date_of_birth is empty
    if (!values.date_of_birth) {
        errors.date_of_birth = "required";
    } else if (values.date_of_birth && values.date_of_birth.trim().length === 0) {
        errors.date_of_birth = "(required)";
      }

      //check phoneNumber is empty
    if (!values.phoneNumber) {
        errors.phoneNumber = "required";
    }
    else if (values.phoneNumber && values.phoneNumber.length !== 10) {
        errors.phoneNumber = "invalid phone number";
    }
    else if (values.phoneNumber && values.phoneNumber < 0) {
        errors.phoneNumber = "invalid phone number";
    }

    //check for provision
    if (!values.provision) {
        errors.provision = "required";
    } else if (values.provision && values.provision.trim().length === 0) {
        errors.provision = "(required)";
      }

    //check for district
    if (!values.district) {
        errors.district = "required";
    } else if (values.district && values.district.trim().length === 0) {
        errors.district = "(required)";
      }

    //check for municipality
    if (!values.municipality) {
        errors.municipality = "required";
    } else if (values.municipality && values.municipality.trim().length === 0) {
        errors.municipality = "(required)";
      }

    //check for village
    if (!values.village) {
        errors.village = "required";
    } else if (values.village && values.village.trim().length === 0) {
        errors.village = "(required)";
    }

    //check for userPhoto
    if (!values.userPhoto) {
        errors.userPhoto = "required";
    }

    //check for CFPhoto
    if (!values.CFPhoto) {
        errors.CFPhoto = "required";
    }

    //check for CBPhoto
    if (!values.CBPhoto) {
        errors.CBPhoto = "required";
    }


    
    return errors;
}

export default Validation;