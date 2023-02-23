import { useRef, useEffect, useState } from "react";

const InputField = ({
  onChange,
  onBlur,
  label,
  name,
  value,
  error,
  helperText,
  className,
}) => {
  const inputRef = useRef(null);
  const [isInputActive, setIsInputActive] = useState(false);

  const blurInput = (e) => {
    if (value && isInputActive) return;
    setIsInputActive(false);
    onBlur(e);
  };

  return (
    <div
      className={`relative w-full max-w-full border-2 border-slate-100 text-base rounded-md px-2 focus-within:border-slate-500 ${
        error && "!border-red-600"
      } ${className}`}
    >
      <label
        htmlFor={name}
        className={`absolute text-sm left-2 px-[2px] transition-all ease-linear dark:text-white ${
          isInputActive
            ? "-translate-y-[14px] bg-white dark:text-white dark:bg-[#1A1A1A]"
            : "translate-y-[6px]"
        } ${error && "text-red-600"}`}
      >
        {label}
      </label>
      <input
        className="w-full py-1 focus:outline-none dark:bg-transparent dark:text-white"
        ref={inputRef}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={(e) => blurInput(e)}
        onFocus={() => setIsInputActive(true)}
      />
      {error && (
        <span className="text-red-600 text-sm pl-2 absolute -bottom-5 left-0">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default InputField;
