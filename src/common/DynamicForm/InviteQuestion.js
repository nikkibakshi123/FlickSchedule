import { useState } from "react";

function renderInput(question, formData, setFormData) {
    const handleInputChange = (event) => {
        const { name, value, type, checked, options } = event.target;

        const updatedData = { ...formData };

        if (type === 'checkbox') {
            if (!updatedData[name]) {
                updatedData[name] = [];
            }

            if (checked) {
                updatedData[name].push(value);
            } else {
                updatedData[name] = updatedData[name].filter((item) => item !== value);
            }
        } else if (type === 'select-multiple') {
            updatedData[name] = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => option.value);
        } else {
            updatedData[name] = value;
        }

        setFormData(updatedData);
    };

    switch (question.answerType) {
        case 'One Line':
            return (
                <input
                    type="text"
                    required={question.required}
                    placeholder={question.questionText}
                    name={`input_${question.questionText}`} // Use unique names
                    value={formData[`input_${question.questionText}`] || ''}
                    onChange={handleInputChange}
                />
            );
        case 'Multiple lines':
            return (
                <textarea
                    required={question.required}
                    placeholder={question.questionText}
                    name={`textarea_${question.questionText}`} // Use unique names
                    value={formData[`textarea_${question.questionText}`] || ''}
                    onChange={handleInputChange}
                ></textarea>
            );
        case 'Phone number':
            return (
                <input
                    type="tel"
                    required={question.required}
                    placeholder={question.questionText}
                    name={`tel_${question.questionText}`} // Use unique names
                    value={formData[`tel_${question.questionText}`] || ''}
                    onChange={handleInputChange}
                />
            );
        case 'Dropdown':
            return (
                <select
                    required={question.required}
                    defaultValue={question.options.selected}
                    name={`select_${question.questionText}`} // Use unique names
                    value={formData[`select_${question.questionText}`] || question.options.selected}
                    onChange={handleInputChange}
                >
                    {question.options.optionsValue.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        case 'Checkboxes':
        case 'Radio Button':
            return (
                <div>
                    {question.options.optionsValue.map((option, index) => (
                        <label key={index}>
                            <input
                                type={question.answerType === 'Checkboxes' ? 'checkbox' : 'radio'}
                                required={question.required}
                                name={`input_${question.questionText}_${option}`} // Use unique names
                                value={option}
                                checked={formData[`input_${question.questionText}_${option}`] === option}
                                onChange={handleInputChange}
                            />{' '}
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
                    placeholder={question.questionText}
                    name={`input_${question.questionText}`}
                    value={formData[`input_${question.questionText}`] || ''}
                    onChange={handleInputChange}
                />
            );
    }
}

function InviteQuestion({ fields, goBack }) {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // You can use formData to send it to an API or perform further actions.
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
