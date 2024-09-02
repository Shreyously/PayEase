import { ChangeEvent } from "react";

interface InputboxType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export function Inputbox({
  label,
  placeholder,
  type,
  onChange,
  className,
  labelClassName,
  inputClassName,
}: InputboxType) {
  return (
    <div className={`flex flex-col  ${className}`}>
      <label className={`py-2 text-left  text-lg ${labelClassName}`} htmlFor="">
        {label}
      </label>
      <input
        className={`min-w-80 py-4  rounded-lg px-2 bg-slate-100	 ${inputClassName}`}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
