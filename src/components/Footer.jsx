import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://shop.sprwforge.com/api/v1/products?all_categories=true&sidebar_data=true"
        );
        const data = await res.json();
        setCategories(data?.data?.all_categories ?? []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Split categories into 4 columns
  const columns = 4;
  const catPerCol = Math.ceil(categories.length / columns);
  const categoryColumns = Array.from({ length: columns }, (_, i) =>
    categories.slice(i * catPerCol, (i + 1) * catPerCol)
  );

  return (
    <footer className="bg-white border-t border-gray-300 mt-10">
      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-gray-700">
          {categoryColumns.map((col, colIdx) => (
            <ul key={colIdx} className="flex flex-col gap-1">
              {col.map((cat) => (
                <li
                  key={cat.id ?? cat.slug}
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className="cursor-pointer text-sm sm:text-base hover:text-orange-500 transition-colors duration-200"
                >
                  {cat.title}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://shop.sprwforge.com/uploads/header-logo.svg"
            alt="Logo"
            className="h-10 sm:h-12"
          />
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 text-center text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} Your Shop Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
