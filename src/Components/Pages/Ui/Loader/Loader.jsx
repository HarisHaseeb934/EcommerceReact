export const Loader = () => {
  return (
    <div className="w-35 md:w-45 lg:w-60 border-blue-500 rounded-xl flex flex-col gap-3 mx-2 shadow-xl">
      <div className="bg-gray-500 w-full h-[100px] md:h-[150px] lg:h-[200px] animate-pulse"></div>
      <div className="flex flex-col gap-2 md:gap-3 p-3 w-full">
        <div className="bg-gray-500 w-[40%] p-1 md:p-2 rounded-2xl animate-pulse"></div>
        <div className="bg-gray-500  w-full p-2 md:p-3 rounded-2xl animate-pulse"></div>
        <div className="bg-gray-500  w-full p-2 md:p-3 rounded-2xl animate-pulse"></div>
        <div className="p-1 w-full rounded-2xl bg-gray-500 animate-pulse"></div>
        <div className="p-1 w-full rounded-2xl bg-gray-500 animate-pulse"></div>
        <div className="p-1 w-full rounded-2xl bg-gray-500 animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gray-500 p-3 md:p-5 rounded-full animate-pulse"></div>
            <div className="bg-gray-500 w-[25px] md:w-[50px] lg:w-[70px] p-2 rounded-2xl animate-pulse"></div>
          </div>
          <div className="bg-gray-500 w-[25px] md:w-[50px] lg:w-[70px] p-2 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
