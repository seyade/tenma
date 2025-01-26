import React from "react";

type InputProps = {
  id: string;
  labelText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  error?: string;
  type?: string;
};

const Input = ({
  id,
  labelText,
  onChange,
  value,
  error,
  placeholder,
  type,
}: InputProps) => {
  return (
    <div className="mb-6">
      <span className="flex flex-col">
        {labelText && (
          <label htmlFor="email" className="pl-4 mb-2 text-sm text-amber-950">
            {labelText}
          </label>
        )}
        <input
          id={id}
          name={id}
          type={type || "text"}
          onChange={onChange}
          value={value}
          className="py-3 px-4 rounded-xl"
          placeholder={placeholder}
        />
      </span>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
