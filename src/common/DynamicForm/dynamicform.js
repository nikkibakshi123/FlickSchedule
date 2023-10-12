import React, { useState } from "react";
import {
  validateFieldAndUpdateErrors,
  validateForm,
} from "../../helpers/validators";
import Textarea from "../EditableFields/textarea.tsx";
import InputField from "../EditableFields/textinput.tsx";

function DynamicForm({ fields, goBack, changeState, scheduleData }) {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    const updatedErrors = validateFieldAndUpdateErrors(
      name,
      value,
      fields,
      formErrors
    );
    // Update the form data and errors state
    setFormData(updatedFormData);
    setFormErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(fields, formData);
    setFormErrors(errors);
    const mergedObject = { ...scheduleData, ...formData };
    console.log("mergedObject", mergedObject);
    if (Object.keys(errors).length === 0) {
      changeState("meeting");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form__time" noValidate>
      <div className="row">
        {fields.map((field, index) => (
          <div key={field.name} className={`col-md-${field.col_divide || 12}`}>
            <div className="time">
              <label htmlFor={field.name}>
                {field.label}
                {field.required && "*"}
              </label>
              <br />
              {(() => {
                switch (field.type) {
                  case "textarea":
                    return (
                      <Textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        cols={field?.cols || 30}
                        rows={field?.rows || 5}
                      />
                    );
                  default:
                    return (
                      <InputField
                        type={field?.type}
                        name={field?.name}
                        placeholder={field?.placeholder}
                        value={field?.value}
                        maxLength={field?.maxLength || 50}
                        required={field?.required || false}
                        pattern={field?.pattern}
                        onChange={handleChange}
                      />
                    );
                }
              })()}

              {formErrors[field.name] && (
                <p className="validation-message">{formErrors[field.name]}</p>
              )}
              {field?.validMessage && !formErrors[field.name] && (
                <p className="valid-message">{field.validMessage}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="form-group text-center mar-b-0">
        <div className="fill_btn back me-3">
          <button type="button" className="next-button" onClick={goBack}>
            Back
          </button>
        </div>
        <div className="fill_btn next">
          <button type="submit" className="next-button">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default DynamicForm;
