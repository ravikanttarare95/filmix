import React from "react";
import { IoLogoGithub } from "react-icons/io";

function Footer({ customStyle }) {
  return (
    <footer
      className={`${customStyle} w-full mt-10 bg-gradient-to-r from-gray-900 via-red-900 to-gray-950 text-white py-4 px-4 `}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/filmix-logo.png" alt="Filmix Logo" className="w-12 h-12" />
          <span className="font-bold text-xl tracking-wide">
            <span className="text-yellow-400">Film</span>
            <span className="text-red-500">ix</span>
          </span>
        </div>
        <div className="text-sm text-gray-300 text-center">
          © {new Date().getFullYear()} Filmix. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/ravikanttarare95"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
            aria-label="GitHub"
          >
            <IoLogoGithub
              size={30}
              className="hover:scale-110 transition duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
