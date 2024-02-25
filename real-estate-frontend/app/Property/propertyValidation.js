function Validation(values) {
    let errors = {};

    // Check if propertyName is empty
    if (!values.propertyName) {
        errors.propertyName = "required";
    }
    // Check if propertyType is empty
    if (!values.propertyType) {
        errors.propertyType = "";
    }


    // Check if Location is empty
    if (!values.provision) {
        errors.provision = "required";
    }
    if (!values.district) {
        errors.district = "required";
    }
    if (!values.municipality) {
        errors.municipality = "required";
    }
    if (!values.village) {
        errors.village = "required";
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
    if (!values.bathrooms) {
        errors.bathrooms = "required";
    }
    if (!values.kitchen) {
        errors.kitchen = "required";
    }
    if (!values.price) {
        errors.price = "required";
    }
    if(!values.yearBuilt){
        errors.yearBuilt = "required";
    }
    if(!values.size){
        errors.size = "required";
    }
    
    return errors;
}

export default Validation;