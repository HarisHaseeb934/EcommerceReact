export const Loader = () => {
  return (
    <div className="w-2xs border-blue-500 rounded-xl flex flex-col gap-3 shadow-xl">
      <div className="bg-gray-500 w-full h-[200px] animate-pulse"></div>
      <div className="flex flex-col gap-3 p-3">
        <div className="bg-gray-500 w-[90px] p-2 rounded-2xl animate-pulse"></div>
        <div className="bg-gray-500 w-[250px] p-3 rounded-2xl animate-pulse"></div>
        <div className="bg-gray-500 w-[250px] p-3 rounded-2xl animate-pulse"></div>
        <div className="p-1 w-[250px] rounded-2xl bg-gray-500 animate-pulse"></div>
        <div className="p-1 w-[250px] rounded-2xl bg-gray-500 animate-pulse"></div>
        <div className="p-1 w-[250px] rounded-2xl bg-gray-500 animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gray-500 p-5 rounded-full animate-pulse"></div>
            <div className="bg-gray-500 w-[50px] p-2 rounded-2xl animate-pulse"></div>
          </div>
          <div className="bg-gray-500 w-[50px] p-2 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
