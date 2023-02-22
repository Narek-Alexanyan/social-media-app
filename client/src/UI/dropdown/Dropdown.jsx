import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Dropdown = ({ options, title, image = null, className }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useOnClickOutside(dropdownRef, () => setIsActive(false));

  const onClick = () => setIsActive(!isActive);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={onClick}
        className="bg-slate-100 dark:bg-slate-50 rounded-[90px] cursor-pointer flex justify-between items-center px-2 py-1 shadow-sm align-middle transition-shadow duration-300 hover:shadow-md"
      >
        <span className="font-medium align-middle text-sm mx-3">{title}</span>
        {image && <img className="rounded-full" src="" alt="avatar" />}
      </button>
      <nav
        className={`bg-slate-100 dark:bg-slate-50 rounded-md absolute top-16 right-0 w-[300px] shadow-md transition duration-300 overflow-hidden ${
          isActive
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }`}
      >
        <ul className="">
          {options.map((option) => (
            <li
              className=" px-2 py-3 hover:bg-slate-200 hover:dark:bg-slate-300 transition-colors cursor-pointer text-base"
              key={option.id}
              onClick={option.action}
            >
              {option.title}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Dropdown;
