import React, { useState } from "react";
import Logo from "./../../public/filmix-logo.png";
import { Link } from "react-router";
import { NAV_LINKS } from "./../configs/Navbar.js";
import { Menu, X } from "lucide-react";

function Navbar({ customStyle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`${customStyle} py-1 backdrop-blur-2xl px-6 flex flex-col sm:flex-row justify-between sm:items-center  sticky top-0 w-full z-50`}
    >
      {/* Logo + Menu Toggle */}
      <div className="flex justify-between items-center w-full sm:w-auto">
        <img src={Logo} alt="Filmix" className="w-24 drop-shadow-lg" />
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-yellow-400 hover:text-red-500 transition"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "flex flex-col mt-4 space-y-4" : "hidden"
        } sm:flex sm:flex-row sm:space-y-0 sm:space-x-8`}
      >
        {NAV_LINKS.map((navLinkObj, index) => (
          <Link
            key={index}
            to={navLinkObj.to}
            className="relative text-white text-lg font-medium transition group hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            {navLinkObj.name}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
