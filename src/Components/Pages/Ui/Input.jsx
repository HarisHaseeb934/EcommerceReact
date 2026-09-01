const Input = ({
  title,
  div = "flex flex-col col-span-1 gap-2",
  htmlFor,
  label = "text-xs",
  type,
  input = "bg-[#f2f3ff] px-3 py-2 rounded-sm flex items-center",
  placeholder,
  children,
  className,
}) => {
  return (
    <div className={div}>
      <label htmlFor={htmlFor} className={label}>
        {title}
      </label>
      <div className={input}>
        {children}
        <input
          type={type}
          name={htmlFor}
          id={htmlFor}
          className={className}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
