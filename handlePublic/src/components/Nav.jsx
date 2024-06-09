import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../components/assets/logo-color.svg";
export default function Nav({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
     <nav className="relative bg-white shadow dark:bg-gray-800">
  <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4">
    <Link
      to="/"
      className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-lime-600 dark:hover:bg-gray-700 md:mx-2"
    >
      Home
    </Link>
    <div className="relative inline-block"></div>
    <div className="flex justify-center items-center md:ml-auto">
      <img
        src={logo}
        style={{ width: '100px', height: 'auto' }}
        className="transition-transform duration-300 ease-in-out hover:scale-110"
        alt="Logo"
      />
    </div>
  </div>
</nav>

    </>
  );
}
