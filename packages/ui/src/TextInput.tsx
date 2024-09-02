import { ChangeEvent } from "react";

interface InputboxType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  value? : string
}

export function TextInput({
  label,
  placeholder,
  type,
  onChange,
  className,
  value,
  labelClassName,
  inputClassName,
}: InputboxType) {
  return (
    <div className={`flex flex-col  ${className}`}>
      <label className={`py-2 text-left  text-lg ${labelClassName}`} htmlFor="">
        {label}
      </label>
      <input
        className={` py-3  rounded-lg px-2 bg-slate-100	 ${inputClassName}`}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
