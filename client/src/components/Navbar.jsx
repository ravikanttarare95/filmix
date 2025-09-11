import React, { useState } from "react";
import Logo from "./../../public/filmix-logo.png";
import { NAV_LINKS } from "./../configs/Navbar.js";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-violet-950 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <img src={Logo} alt="Filmix" className="w-20 h-auto mr-4" />

        <div className="hidden sm:flex space-x-8">
          {NAV_LINKS.map((navLinkObj, index) => (
            <a
              key={index}
              href={navLinkObj.to}
              className="text-white hover:text-violet-300 text-lg transition-colors duration-300 font-medium"
            >
              {navLinkObj.name}
            </a>
          ))}
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden bg-violet-950 transition-all duration-300 ${
          isOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          {NAV_LINKS.map((navLinkObj, index) => (
            <a
              key={index}
              href={navLinkObj.to}
              className="text-white hover:text-violet-300 text-lg transition-colors duration-300 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {navLinkObj.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
