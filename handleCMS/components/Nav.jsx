import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function Nav({ setPage }) {
  const navigate = useNavigate()

  function handleLogout() {
      localStorage.clear()
      navigate('/login')
  }
 
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            <Link to="/" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2">
              Home
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <a onClick={handleLogout} className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
