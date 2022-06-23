import React from "react";

const Navbar = () => {
  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#292C6D] text-gray-300">
      <div>
        <h1 className="text-3xl  text-white text-center flex justify-center font-extrabold">
          Sorting Visualizer
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
