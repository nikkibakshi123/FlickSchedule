import React from 'react';

// Define the interface for InputFieldProps
interface InputFieldProps {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Define the InputField component
function InputField({
  type,
  name,
  placeholder,
  value,
  maxLength = 50,
  required = false,
  pattern,
  onChange,
}: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      required={required}
      pattern={pattern}
      onChange={onChange}
    />
  );
}

export default InputField;
