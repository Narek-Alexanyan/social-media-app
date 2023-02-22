import { HiSearch } from 'react-icons/hi';

const SearchField = () => {
  return (
    <div className="flex justify-between items-center px-6 py-1 bg-gray bg-slate-100 dark:bg-slate-50 rounded-md">
      <input className=" border-none bg-transparent text-base font-medium focus:outline-none" type="text" placeholder="Search..." />
      <button>
        <HiSearch />
      </button>
    </div>
  );
};

export default SearchField;
