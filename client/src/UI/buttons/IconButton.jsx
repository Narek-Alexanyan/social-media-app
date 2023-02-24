import React from "react";

const IconButton = ({ children, className }) => {
  return (
    <button
      className={`${className} w-8 h-8 rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-slate-600 flex justify-center items-center`}
    >
      {children}
    </button>
  );
};

export default IconButton;
