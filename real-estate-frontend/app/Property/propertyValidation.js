function Validation(values) {
    let errors = {};

    // Check if propertyName is empty
    if (!values.propertyName) {
        errors.propertyName = "required";
    } else if (values.propertyName && values.propertyName.trim().length === 0) {
        errors.propertyName = "(required)";
      }
    // Check if propertyType is empty
    if (!values.propertyType) {
        errors.propertyType = "";
    }


    // Check if Location is empty
    if (!values.provision) {
        errors.provision = "required";
    } else if (values.provision && values.provision.trim().length === 0) {
        errors.provision = "(required)";
      }

    if (!values.district) {
        errors.district = "required";
    } else if (values.district && values.district.trim().length === 0) {
        errors.district = "(required)";
      }

    if (!values.municipality) {
        errors.municipality = "required";
    } else if (values.municipality && values.municipality.trim().length === 0) {
        errors.municipality = "(required)";
      }


    if (!values.village) {
        errors.village = "required";
    } else if (values.village && values.village.trim().length === 0) {
        errors.village = "(required)";
      }

    //check if image1, image2, image3 is empty
    if (!values.image1) {
        errors.image1 = "required";
    }

    if (!values.image2) {
        errors.image2 = "required";
    }
    if (!values.image3) {
        errors.image3 = "required";
    }

    //property Details
    if (!values.bedrooms) {
        errors.bedrooms = "required";
    }
//check for negative values
    if(values.bedrooms < 0){
        errors.bedrooms = "invalid";
    }

    if (!values.bathrooms) {
        errors.bathrooms = "required";
    }
    if(values.bathrooms < 0){
        errors.bathrooms = "invalid";
    }

    if (!values.kitchen) {
        errors.kitchen = "required";
    }
    if(values.kitchen < 0){
        errors.kitchen = "invalid";
    }

    if (!values.price) {
        errors.price = "required";
    }
    if(values.price < 0){
        errors.price = "invalid";
    }

    if(!values.yearBuilt){
        errors.yearBuilt = "required";
    }
    if(values.yearBuilt < 0){
        errors.yearBuilt = "invalid";
    }

    if(!values.size){
        errors.size = "required";
    }
    if(values.size < 0){
        errors.size = "invalid";
    }
    
    return errors;
}

export default Validation;