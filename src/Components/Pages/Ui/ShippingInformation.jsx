import Input from "./Input";

const ShippingInformation = () => {
  return (
    <div className="bg-white flex flex-col w-full md:max-w-2xl gap-6 px-4 py-2 my-10">
      <div className="flex items-center gap-3">
        <span className="size-7 flex items-center justify-center text-[14px] bg-[#eae9fa] text-primary rounded-full">
          1
        </span>
        <h1 className="text-xl font-semibold">Shipping Information</h1>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input title={"First Name"} type="text" htmlFor={"firstName"} className={"outline-none w-full"}/>
        <Input title={"Last Name"} type="text" htmlFor={"lastName"} className={"outline-none w-full"}/>

        <Input
          title={"Email Address"}
          type="email"
          htmlFor={"email"}
          div="flex flex-col col-span-1 md:col-span-2 gap-2"
          className={"outline-none w-full"}
        />
        <Input
          title={"Street Address"}
          type="text"
          htmlFor={"street"}
          div="flex flex-col col-span-1 md:col-span-2 gap-2"
          className={"outline-none w-full"}
        />

        <Input
          title={"City"}
          type="text"
          htmlFor={"city"}
          div="flex flex-col col-span-1 gap-2"
          className={"outline-none w-full"}
        />

        <div className="col-span-1 flex gap-3">
          <Input
            title={"State"}
            type="text"
            htmlFor={"state"}
            div="flex flex-col w-1/2 gap-2"
            className={"outline-none w-full"}
          />
          <Input
            title={"ZIP Code"}
            type="text"
            htmlFor={"zipCode"}
            div="flex flex-col w-1/2 gap-2"
            className={"outline-none w-full"}
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingInformation;
