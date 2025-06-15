// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed font-sans bg-sky-50 bg-opacity-60 backdrop-blur-[5px] shadow-md px-6 py-4 w-screen top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="w-40">
          <img src="/fresh fish.png"/>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-[#2737af] font-medium text-lg">
          <li><Link to="/" className="block p-2 rounded-md transition duration-500 ease-in-out hover:bg-[#283593] hover:text-white hover:shadow-md">Beranda</Link></li>
          <li><Link to="/about-us" className="block p-2 rounded-md transition duration-500 ease-in-out hover:bg-[#283593] hover:text-white hover:shadow-md">Tentang Kami</Link></li>
          <li><Link to="/data-kolam" className="block p-2 rounded-md transition duration-500 ease-in-out hover:bg-[#283593] hover:text-white hover:shadow-md">Data Kolam</Link></li>
          <li><Link to="/laporan-keuangan" className="block p-2 rounded-md transition duration-500 ease-in-out hover:bg-[#283593] hover:text-white hover:shadow-md">Laporan Keuangan</Link></li>
          <li><Link to="/login" className="block p-2 rounded-md transition duration-500 ease-in-out hover:bg-[#283593] hover:text-white hover:shadow-md">Login</Link></li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col transition duration-300 ease-in-out gap-4 text-gray-700 font-medium px-6">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/about-us">Tentang Kami</Link></li>
          <li><Link to="/data-kolam">Data Kolam</Link></li>
          <li><Link to="/laporan-keuangan">Laporan Keuangan</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
