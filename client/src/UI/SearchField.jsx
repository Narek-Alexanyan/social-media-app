import { HiSearch } from "react-icons/hi";

const SearchField = ({
  value,
  onChange,
  className,
  icon = true,
  placeholder = "Search...",
}) => {
  return (
    <div
      className={`flex justify-between items-center px-6 py-1 bg-gray bg-slate-100 dark:bg-slate-50 rounded-md ${className}`}
    >
      <input
        className=" border-none bg-transparent text-base font-medium focus:outline-none"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {icon && (
        <button>
          <HiSearch />
        </button>
      )}
    </div>
  );
};

export default SearchField;
