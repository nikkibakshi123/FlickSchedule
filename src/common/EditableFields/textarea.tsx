// Textarea.tsx
import React from "react";

interface TextareaProps {
  name: string;
  placeholder?: string;
  value: string;
  cols?: number;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  placeholder,
  value,
  cols = 30,
  rows = 5,
  onChange,
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      cols={cols}
      rows={rows}
      onChange={onChange}
      className="text-area"
    />
  );
};

export default Textarea;
