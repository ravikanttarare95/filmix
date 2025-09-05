import React from "react";
import Logo from "./../public/filmix-logo.png";

function App() {
  return (
    <div className="text-8xl font-extrabold w-fit mx-auto p-10 bg-gradient-to-r from-violet-500 to-violet-900 bg-clip-text text-transparent">
      <img src={Logo} alt="Filmix" className="w-40"/> Filmix
    </div>
  );
}

export default App;
