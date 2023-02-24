import React from "react";

const WidgetWrapper = ({ children, className }) => {
  return <div className={`px-6 pt-6 pb-3 bg-white dark:bg-[#1A1A1A] rounded-xl ${className}`}>{children}</div>;
};

export default WidgetWrapper;
