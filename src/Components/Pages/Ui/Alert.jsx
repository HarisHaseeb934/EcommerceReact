const Alert = ({ message, className = "" }) => {
  return (
    <div
      className={`fixed top-30 right-5 z-50 transition-all duration-300 ease-out transform translate-x-0 opacity-100 w-[300px] bg-white shadow-xl p-4 border-l-4 rounded-r-lg ${className}`}
    >
      <p className="text-xs font-medium">{message}</p>
    </div>
  );
};

export default Alert;
