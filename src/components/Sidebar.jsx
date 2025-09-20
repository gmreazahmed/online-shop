import { useState } from "react";
import { LiaBarsSolid } from "react-icons/lia";
import { VscChromeClose } from "react-icons/vsc";

const Sidebar = ({ categories = [], onSelectCategory, onPriceFilter }) => {
  const [isOpen, setIsOpen] = useState(false); // small screens

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto sticky top-[200px] z-[999]">
      {/* Hamburger for small screens */}
      <div className="lg:hidden p-4 relative z-50">
        <div className="lg:hidden relative top-[-11px] -left-6">
          <div
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0 -translate-x-2"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <VscChromeClose className="text-black text-[24px] absolute" />
          </div>
          <div
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "opacity-0 translate-x-2" : "opacity-100"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <LiaBarsSolid className="text-black text-[24px] absolute" />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-[300px] p-2 lg:p-0 lg:top-0 left-0 h-full
          transform transition-transform duration-300 z-[999]
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Scrollable Category Section */}
        <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-1">
          {/* All Products Button */}
          <button
            onClick={() => {
              onSelectCategory(null);
              setIsOpen(false);
              goTop();
            }}
            className="block w-full text-left px-3 py-1 text-gray-800 rounded-sm"
          >
            All Products
          </button>

          {/* Category Buttons */}
          {categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat.id ?? cat.slug}
                onClick={() => {
                  onSelectCategory(cat.slug ?? "");
                  setIsOpen(false);
                  goTop();
                }}
                className="block w-full text-left px-3 py-1 text-gray-800 rounded-sm"
              >
                {cat.title ?? "Untitled"}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No categories available</p>
          )}
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
