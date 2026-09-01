import { useState } from "react";
import Input from "./Ui/Input";

const SignIn = () => {
  const [isSignIn, setSignIn] = useState(true);
  return (
    <section className="w-full bg-[#f8f5ff] lg:py-10">
      <div className="max-w-lg m-auto flex flex-col justify-center items-center bg-white shadow-md py-8">
        <div className="flex flex-col justify-center items-center gap-1">
          <img src="Logo.png" alt="logo" className="w-20" />
          <h1 className="text-2xl font-bold">ApexStore</h1>
          <p className="text-slate-600 text-sm">
            Welcome back. Please enter your details.
          </p>
        </div>
        <div className="flex gap-3 text-xs font-semibold bg-[#f2f3ff] w-[80%] flex justify-between p-1 mt-7">
          <button
            className={`${isSignIn && "bg-white"} py-2 px-6 md:px-14`}
            onClick={() => setSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`${!isSignIn && "bg-white"} py-2 px-6 md:px-14`}
            onClick={() => setSignIn(false)}
          >
            Create Account
          </button>
        </div>
        <form className={`w-[80%] gap-4 mt-5 ${isSignIn ? "flex flex-col" : "grid grid-cols-1 md:grid-cols-2"}`}>
          {isSignIn && (
            <>
              <Input
                type={"email"}
                placeholder={"you@example.com"}
                input={"bg-[#f2f3ff] px-3 py-2 w-full text-sm"}
                div={"w-full"}
                className={"w-full outline-none"}
              />
              <Input
                type={"password"}
                placeholder={"*******"}
                input={"bg-[#f2f3ff] px-3 py-2 w-full text-sm"}
                div={"w-full"}
                className={"w-full outline-none"}
              />
            </>
          )}

          {!isSignIn && (
            <>
                <Input
                  type={"text"}
                  placeholder={"First Name"}
                  htmlFor={"firstName"}
                  input={"bg-[#f2f3ff] px-3 py-2 w-full text-sm"}
                  div={"w-full md:col-span-1"}
                  className={"w-full outline-none"}
                />
                <Input
                  type={"text"}
                  placeholder={"Last Name"}
                  htmlFor={"lastName"}
                  input={"bg-[#f2f3ff] px-3 py-2 w-full text-sm"}
                  div={"w-full md:col-span-1"}
                  className={"w-full outline-none"}
                />
              <Input
                type={"email"}
                placeholder={"you@example.com"}
                input={"bg-[#f2f3ff] px-3 py-2 w-full text-sm"}
                div={"w-full md:col-span-2"}
                className={"w-full outline-none"}
              />
              <Input
                type={"password"}
                placeholder={"Password"}
                input={"bg-[#f2f3ff] px-3 py-2 w-full text-sm"}
                div={"w-full md:col-span-2"}
                className={"w-full outline-none"}
              />
              <Input
                type={"password"}
                placeholder={"Confirm Password"}
                input={"bg-[#f2f3ff] px-3 py-2 w-full text-sm"}
                div={"w-full md:col-span-2"}
                className={"w-full outline-none"}
              />
            </>
          )}
        </form>
        <div className="w-[80%] flex flex-col gap-5 mt-10">
          <div className="w-full text-slate-600 text-xs flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-slate-300"></div>
            <p>Or countinue with Google</p>
            <div className="flex-1 h-[1px] bg-slate-300"></div>
          </div>
          <button className=" border-slate-300 border py-3 text-xs">
            Google
          </button>
          <button className=" border-slate-300 border py-3 text-xs">
            Apple
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
