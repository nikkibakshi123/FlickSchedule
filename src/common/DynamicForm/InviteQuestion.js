import React, { useState } from "react";
import axios from 'axios';

function renderInput(question, formData, setFormData) {
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [question.questionText]: event.target.value,
    });
  };

  switch (question.answerType) {
    case "text":
      return (
        <input
          type="text"
          required={question.required}
          placeholder={question.questionText}
          onChange={handleInputChange}
        />
      );
    case "textarea":
      return (
        <textarea
          required={question.required}
          placeholder={question.questionText}
          onChange={handleInputChange}
        ></textarea>
      );
    case "number":
      return (
        <input
          type="tel"
          required={question.required}
          placeholder={question.questionText}
          onChange={handleInputChange}
        />
      );
    default:
      return (
        <input
          type="text"
          required={question.required}
          placeholder={question.questionText}
          onChange={handleInputChange}
        />
      );
  }
}

function InviteQuestion({ fields, goBack, changeState, scheduleData }) {
  const [formData, setFormData] = useState({});

  async function handleSubmit(event) {
    event.preventDefault(); 
    
    const finalObject={
      scheduleData,
      formData
    }
console.log(finalObject);
    try{
      let response = await axios.post(process.env.REACT_APP_URL_POST,formData);
      console.log(response);
      alert(response.code);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {fields?.map((question, index) => (
          <div key={index} className="col-md-6">
            <label>{question.questionText}</label>
            {renderInput(question, formData, setFormData)}
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

export default InviteQuestion;
