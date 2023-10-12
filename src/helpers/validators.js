// isValidEmail function to validate an email address
const isValidEmail = (email) => {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailPattern.test(email);
};

// validateField function to validate a field based on its properties
export const validateField = (field, value) => {
  // Check if the field is of type "email" and validate the email format
  if (field.type === "email" && !isValidEmail(value)) {
    return field.validationMessage || "Enter a valid email address.";
  }

  // Check if the field is required and empty
  if (field.required && !value) {
    return field.validationMessage || "This field is required.";
  }

  // If no validation errors, return an empty string
  return "";
};

export const validateFieldAndUpdateErrors = (
  fieldName,
  fieldValue,
  fields,
  formErrors
) => {
  // Create a copy of the current errors
  const updatedErrors = { ...formErrors };

  // Find the field in the fields array
  const field = fields.find((field) => field.name === fieldName);

  if (field) {
    // Use the common validation function
    const errorMessage = validateField(field, fieldValue);

    // Update the error message for the field
    updatedErrors[fieldName] = errorMessage;
  }

  return updatedErrors;
};

export const validateForm = (fields, formData) => {
  const errors = {};

  fields.forEach(({ name, required, type, validationMessage }) => {
    const value = formData[name];

    if (required && !value) {
      errors[name] = validationMessage || "This field is required.";
    } else if (type === "email" && !isValidEmail(value)) {
      errors[name] = validationMessage || "Enter a valid email address.";
    }

    const inputElement = document.getElementsByName(name)[0];
    inputElement.setCustomValidity(errors[name] || "");
  });
  return errors;
};