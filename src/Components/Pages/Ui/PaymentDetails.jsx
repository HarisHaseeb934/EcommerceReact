import Input from "./Input";
import { FiCreditCard } from "react-icons/fi";

const PaymentDetails = () => {
  return (
    <div className="bg-white flex flex-col w-full md:max-w-2xl gap-6 px-4 py-2 my-10">
      <div className="flex items-center gap-3">
        <span className="size-7 flex items-center justify-center text-[14px] bg-[#eae9fa] text-primary rounded-full">
          2
        </span>
        <h1 className="text-xl font-semibold">Payment Details</h1>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          type={"tel"}
          title={"Card Number"}
          placeholder={"0000  0000 0000 0000"}
          className={"px-2 outline-none w-full"}
          htmlFor={"cardNumber"}
          div="flex flex-col md:col-span-2 gap-2"
        >
          <FiCreditCard className="slate" />
        </Input>
        <Input
          type={"text"}
          title={"Name on Card"}
          className={"px-2 outline-none w-full"}
          htmlFor={"cardNumber"}
          div="flex flex-col md:col-span-2 gap-2"
        />
        <Input
          type={"number"}
          title={"Expiration Date"}
          placeholder={"MM/YY"}
          className={"px-2 outline-none w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"}
          htmlFor={"date"}
          div="flex flex-col col-span-1 gap-2"
        />
        <Input
          type={"number"}
          title={"CVV"}
          placeholder={"123"}
          className={"px-2 outline-none w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"}
          htmlFor={"cardNumber"}
          div="flex flex-col col-span-1 gap-2"
        />
      </form>
    </div>
  );
};

export default PaymentDetails;
