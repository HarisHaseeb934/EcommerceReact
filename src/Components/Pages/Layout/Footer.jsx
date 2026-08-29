import { NavLink } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F2F3FF] text-[#303542]">
      <div className="max-w-6xl w-full m-auto px-4 divide-y divide-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 py-4">
          <div>
            <div className="flex gap-2 py-1">
              <img src="Logo.png" alt="" width={"25px"}/>
              <h1 className="font-bold">ApexStore</h1>
            </div>
            <p className="text-sm">Crafting the future of retail with sophistication and ease.</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-sm py-1">Shop</h1>
            <NavLink to={"/shop"} className={"text-sm"}>Shop All</NavLink>
            <NavLink to={"/categories"} className={"text-sm"}>Categories</NavLink>
          </div>
          <div>
            <h1 className="font-bold text-sm py-1">Support</h1>
            <p className="text-sm">Shipping Policy</p>
            <p className="text-sm">Return & Exchange</p>
            <p className="text-sm">FAQs</p>
          </div>
          <div className="flex gap-2 flex-col">
            <h1 className="font-bold text-sm py-1">Connect</h1>
            <div className="flex gap-3 items-center">
              <BiWorld className="text-xl"/>
              <MdOutlineMail className="text-xl"/>
              <MdOutlineMessage className="text-xl"/>
            </div>
          </div>
        </div>
        <div className="text-sm flex flex-col sm:flex-row justify-between p-4 gap-4">
          <div>@2024 ApexStore. All rights reserved</div>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
