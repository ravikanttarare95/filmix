import React, { useState } from "react";
import Logo from "./../../public/filmix-logo.png";
import { NAV_LINKS } from "./../configs/Navbar.js";
import { Menu, X } from "lucide-react";

function Navbar({ customStyle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`${customStyle} py-2 px-5 flex flex-col sm:flex-row justify-between sm:items-center bg-black text-white shadow-md fixed w-full z-50`}
    >
      <div className="flex justify-between items-center">
        <img src={Logo} alt="Filmix" className="w-20" />
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>{" "}
      </div>
      <div
        className={` ${
          isOpen ? "flex flex-col" : "hidden"
        } sm:flex sm:flex-row space-y-5 sm:space-x-8`}
      >
        {NAV_LINKS.map((navLinkObj, index) => (
          <a
            key={index}
            href={navLinkObj.to}
            className="text-white hover:text-violet-300 text-lg text-center transition-colors duration-300 font-medium  "
            onClick={() => setIsOpen(false)}
          >
            {navLinkObj.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
