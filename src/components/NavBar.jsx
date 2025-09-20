import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiChevronDown,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const locales = [
  "en-GB","ar-SA","zh-CN","de-DE","es-ES","fr-FR","hi-IN","it-IT",
  "in-ID","ja-JP","ko-KR","nl-NL","no-NO","pl-PL","pt-BR","sv-SE",
  "fi-FI","th-TH","tr-TR","uk-UA","vi-VN","ru-RU","he-IL",
];

const NavBar = ({ searchTerm, setSearchTerm, cart }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Default locale
  useEffect(() => {
    const browserLang = new Intl.Locale(navigator.language).language;
    const match = locales.find(
      (locale) => new Intl.Locale(locale).language === browserLang
    );
    if (match) setSelectedLocale(match);
  }, []);

  const intlLocale = new Intl.Locale(selectedLocale);
  const langName = new Intl.DisplayNames([selectedLocale], {
    type: "language",
  }).of(intlLocale.language);
  const otherLocales = locales.filter((loc) => loc !== selectedLocale);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert("You are logged out!");
    } else {
      navigate("/login");
    }
  };

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full border-b shadow-sm sticky top-0 bg-white z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between container mx-auto py-3 px-4 text-sm">
        <div className="flex items-center gap-4 relative">
          {/* Language */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 border px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm"
            >
              <span className="capitalize">{langName}</span>
              <FiChevronDown className="text-gray-600 text-base" />
            </button>

            {dropdownOpen && (
              <ul className="absolute mt-2 bg-white shadow-lg rounded-md border w-36 max-h-48 overflow-y-auto z-50 text-sm">
                {otherLocales.map((locale) => {
                  const otherIntl = new Intl.Locale(locale);
                  const otherLangName = new Intl.DisplayNames([locale], {
                    type: "language",
                  }).of(otherIntl.language);
                  return (
                    <li
                      key={locale}
                      className={`px-3 py-1.5 cursor-pointer hover:bg-gray-100 ${
                        selectedLocale === locale ? "bg-gray-50 font-medium" : ""
                      }`}
                      onClick={() => {
                        setSelectedLocale(locale);
                        setDropdownOpen(false);
                      }}
                    >
                      {otherLangName}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Contact */}
          <p className="hidden lg:flex items-center gap-1 text-gray-600 text-sm">
            <FiMail className="text-gray-500" />{" "}
            <a href="mailto:webzedcontact@gmail.com">webzedcontact@gmail.com</a>
          </p>
          <p className="hidden sm:flex items-center gap-1 text-gray-600 text-sm">
            <FiPhone className="text-gray-500" />{" "}
            <a href="tel:4534345656">4534345656</a>
          </p>
        </div>

        {/* Login + Cart */}
        <div className="flex items-center gap-5">
          <button
            onClick={handleLoginLogout}
            className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow hover:shadow-md transition"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingCart className="text-2xl" />
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="flex items-center py-3 px-4">
        <div className="container mx-auto flex items-center gap-4">
          {/* Logo */}
          <div
            className="cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          >
            <img
              src="https://shop.sprwforge.com/uploads/header-logo.svg"
              alt="Logo"
              className="w-auto h-9"
            />
          </div>

          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 pl-3 pr-10 py-2.5 rounded-lg text-base outline-none focus:ring-1 focus:ring-blue-600"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
