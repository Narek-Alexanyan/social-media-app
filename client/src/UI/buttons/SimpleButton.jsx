const SimpleButton = ({ onClick, children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full text-base p-2 uppercase transition-colors bg-slate-200 dark:bg-slate-100 hover:bg-slate-300 hover:dark:bg-slate-300 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
