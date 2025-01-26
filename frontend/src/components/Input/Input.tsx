import React from "react";

type InputProps = {
  id: string;
  labelText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
};

const Input = ({ id, labelText, onChange, value, error }: InputProps) => {
  return (
    <div className="mb-3">
      <span className="flex flex-col">
        {labelText && (
          <label htmlFor="email" className="pl-3">
            {labelText}
          </label>
        )}
        <input
          id={id}
          name={id}
          type="text"
          onChange={onChange}
          value={value}
          className="py-2 px-3 rounded-xl"
          placeholder={labelText}
        />
      </span>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
