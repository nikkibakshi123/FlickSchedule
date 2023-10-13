import React, { useState } from "react";

function renderInput(question, formData, setFormData) {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  switch (question.answerType) {
    case "One Line":
      return (
        <input
          type="text"
          required={question.required}
          name={question.questionText}
          placeholder={question.questionText}
          value={formData[question.questionText] || ""}
          onChange={handleInputChange}
        />
      );
    case "Multiple lines":
      return (
        <textarea
          required={question.required}
          name={question.questionText}
          placeholder={question.questionText}
          value={formData[question.questionText] || ""}
          onChange={handleInputChange}
        ></textarea>
      );
    case "Phone number":
      return (
        <input
          type="tel"
          required={question.required}
          name={question.questionText}
          placeholder={question.questionText}
          value={formData[question.questionText] || ""}
          onChange={handleInputChange}
        />
      );
    case "Dropdown":
      return (
        <select
          required={question.required}
          name={question.questionText}
          value={formData[question.questionText] || question.options.selected}
          onChange={handleInputChange}
        >
          <option value="">Select an option</option>
          {question.options.optionsValue.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "Checkboxes":
      return (
        <div>
          {question.options.optionsValue.map((option, index) => (
            <label key={index}>
              <input
                type={"checkbox"}
                required={question.required}
                name={question.questionText}
                value={option}
                // checked={formData[question.questionText] === option || question.options.selected === option}
                onChange={handleInputChange}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      );
    case "Radio Button":
      return (
        <div>
          {question.options.optionsValue.map((option, index) => (
            <label key={index}>
              <input
                type={
                  question.answerType === "Checkboxes" ? "checkbox" : "radio"
                }
                required={question.required}
                name={question.questionText}
                value={option}
                checked={
                  formData[question.questionText] === option ||
                  question.options.selected === option
                }
                onChange={handleInputChange}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      );
    default:
      return (
        <input
          type="text"
          required={question.required}
          name={question.questionText}
          placeholder={question.questionText}
          value={formData[question.questionText] || ""}
          onChange={handleInputChange}
        />
      );
  }
}

function InviteQuestion({ fields, goBack }) {
  const [formData, setFormData] = useState({});
  function transformQuestionsToJSON(questions) {
    const result = {};
    for (const question of questions) {
      result[question.questionText] = question.options
        ? question.options.selected
        : "";
    }
    return JSON.stringify(result, null, 2); // The '2' parameter formats the JSON with indentation.
  }
  const jsonResult = JSON.parse(transformQuestionsToJSON(fields));
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (jsonResult.hasOwnProperty(key)) {
        jsonResult[key] = formData[key];
      }
    }
    console.log("finalData", jsonResult);
  };

  return (
    <form onSubmit={handleSubmit} className="form__time" noValidate>
      <div className="row">
        {fields?.map((question, index) => (
          <div key={index} className="col-md-6 mb-4">
            <label>{question.questionText}</label>
            {renderInput(question, formData, setFormData)}
          </div>
        ))}
      </div>
      <div className="form-group text-center">
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

export default InviteQuestion;
