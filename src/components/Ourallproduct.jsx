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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="cursor-pointer flex flex-col"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden rounded-lg shadow">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-full object-contain"
            />
            <span className="absolute top-2 right-2 bg-red-400 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
              €{product.selling}
            </span>
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 hover:text-red-500 text-center">
            {product.title}
          </h2>

          {product.description && (
            <p className="mt-2 text-gray-600 text-xs sm:text-sm text-center">
              {product.description.slice(0, 50)}
              {product.description.length > 50 ? "..." : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Ourallproduct;
