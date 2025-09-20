import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

const ProductDetailsPage = ({ addToCart, cart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Main product
        const res = await fetch(`https://shop.sprwforge.com/api/v1/product/${id}`);
        const data = await res.json();
        setProduct(data?.data ?? null);

        // Recommended products: same category
        if (data?.data?.categories?.length > 0) {
          const catSlug = data.data.categories[0].slug;
          const recRes = await fetch(
            `https://shop.sprwforge.com/api/v1/all?category=${catSlug}&per_page=8`
          );
          const recData = await recRes.json();
          setRecommendedProducts(
            recData?.data?.result?.data?.filter((p) => p.id !== data.data.id) ?? []
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setQuantity(1);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <Loading />;
  if (!product)
    return <p className="text-center mt-20 text-gray-500">Product not found.</p>;

  return (
    <div className="container mx-auto p-4 pt-[120px]">
      {/* Main Product */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images */}
        <div className="flex flex-col lg:w-1/2 gap-4">
          <div className="border rounded-lg p-2 bg-white shadow hover:shadow-lg transition-shadow duration-300">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-[350px] object-contain rounded-lg"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3 mt-2 overflow-x-auto">
            {[product.image, product.image].map((img, idx) => (
              <img
                key={idx}
                src={`https://shop.sprwforge.com/uploads/${img}`}
                alt={`${product.title} ${idx + 1}`}
                className="w-20 h-20 object-contain border rounded-lg cursor-pointer hover:border-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-2">€{product.selling}</p>
            {product.brands && (
              <p className="text-gray-600 mb-2 font-medium">Brand: {product.brands}</p>
            )}
            {product.badge && (
              <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.badge}
              </span>
            )}
            {product.description && (
              <p className="text-gray-700 mb-4">{product.description}</p>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap mt-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {recommendedProducts.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 bg-white shadow hover:shadow-lg cursor-pointer transition"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={`https://shop.sprwforge.com/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-3 rounded-lg"
                />
                <h3 className="text-sm font-semibold mb-1 truncate">{item.title}</h3>
                {item.brands && (
                  <p className="text-gray-500 text-xs mb-1 truncate">{item.brands}</p>
                )}
                {item.badge && (
                  <span className="inline-block bg-green-500 text-white px-2 py-0.5 rounded-full text-xs mb-1">
                    {item.badge}
                  </span>
                )}
                <p className="text-blue-600 font-bold text-sm">€{item.selling}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
