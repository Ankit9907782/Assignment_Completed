
import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";

export default function ProductManager() {

  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  // 🔹 Load products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/all");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Add product to list after creation
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <div className="p-6">

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => setShowModal(true)}
      >
        Add Product
      </button>

      {showModal && (
        <AddProduct
          closeModal={() => {
            setShowModal(false);
            fetchProducts(); // refresh list
          }}
          addProduct={handleAddProduct}
        />
      )}

      <h2 className="text-xl font-semibold mb-4">Cart / Products</h2>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul className="space-y-4">

          {products.map((p) => (
            <li
              key={p._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >

              <div>
                <p className="font-semibold">{p.name}</p>

                <p className="text-sm text-gray-600">{p.type}</p>

                <p className="text-sm">
                  Quantity: {p.quantityStock}, Price: ₹{p.sellingPrice}
                </p>

                <p className="text-sm text-gray-500">
                  Brand: {p.brandName}
                </p>

                <p className="text-sm text-gray-500">
                  Return Eligible: {p.exchangeOrReturn}
                </p>
              </div>

              {p.images && p.images.length > 0 && (
                <img
                  src={`http://localhost:5000${p.images[0]}`}
                  alt={p.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}

            </li>
          ))}

        </ul>
      )}

    </div>
  );
}

