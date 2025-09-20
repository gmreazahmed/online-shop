import { useNavigate } from "react-router-dom";

const Ourallproduct = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No products available.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="bg-white rounded-xl shadow-md cursor-pointer overflow-hidden"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden rounded-t-xl">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-full object-contain"
            />
            <span className="absolute top-2 right-2 bg-red-400 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
              €{product.selling}
            </span>
          </div>
          <div className="p-3 text-center">
            <h2 className="text-sm sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold text-gray-800 truncate">
              {product.title}
            </h2>
            <p className="mt-1 text-gray-500 text-xs sm:text-sm">
              {product.description?.slice(0, 50)}
              {product.description && product.description.length > 50 ? "..." : ""}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Ourallproduct;
