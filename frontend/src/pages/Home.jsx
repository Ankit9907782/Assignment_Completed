
import { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";

function Home() {

  const [tab, setTab] = useState("Published");
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const fetchProducts = async (status) => {
    try {

      const res = await axios.get(
        `https://assignment-completed.onrender.com/api/product/all/status?status=${status}`
      );

      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts(tab);
  }, [tab]);


  const handleDelete = async (id) => {
    try {

      await axios.delete(
        `https://assignment-completed.onrender.com/api/product/delete/${id}`
      );

      setDeleteProduct(null);
      fetchProducts(tab);

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex-1 p-6 bg-gray-50">

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2 mb-10">

        <button
          onClick={() => setTab("Published")}
          className={`pb-2 ${
            tab === "Published"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-400"
          }`}
        >
          Published
        </button>

        <button
          onClick={() => setTab("Unpublished")}
          className={`pb-2 ${
            tab === "Unpublished"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-400"
          }`}
        >
          Unpublished
        </button>

      </div>


      {/* Empty state */}
      {products.length === 0 ? (

        <div className="flex flex-col items-center justify-center h-[60vh] text-center">

          <div className="text-[#0F1C7A] text-5xl mb-6">
            <img
              src="/imag3.png"
              alt="empty"
              className="w-[100px] h-[100px] object-cover"
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-700">
            No {tab} Products
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Your {tab} Products will appear here
          </p>

          <p className="text-gray-400 text-sm">
            Create your first product to publish
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-3 gap-[20px]">

          {products.map((p) => (

            <div
              key={p._id}
              className="bg-white rounded-[12px] border border-[#EAECF0] shadow-sm p-[16px]"
            >

              {/* Product Image */}
              <div className="h-[150px] bg-[#F9FAFB] rounded-[8px] flex items-center justify-center mb-[12px]">

                {p.images && p.images.length > 0 && (
                  <img
                    src={`https://assignment-completed.onrender.com${p.images[0]}`}
                    alt="product"
                    className="h-[120px] object-contain"
                  />
                )}

              </div>


              {/* Product Name */}
              <h3 className="text-[14px] font-semibold text-[#344054] mb-[8px]">
                {p.name}
              </h3>


              {/* Details */}
              <div className="text-[13px] text-[#667085] space-y-[4px]">

                <div className="flex justify-between">
                  <span>Product type -</span>
                  <span>{p.type}</span>
                </div>

                <div className="flex justify-between">
                  <span>Quantity Stock -</span>
                  <span>{p.quantityStock}</span>
                </div>

                <div className="flex justify-between">
                  <span>MRP -</span>
                  <span>₹{p.mrp}</span>
                </div>

                <div className="flex justify-between">
                  <span>Selling Price -</span>
                  <span>₹{p.sellingPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Brand Name -</span>
                  <span>{p.brandName}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Number of images -</span>
                  <span>{p.images?.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Exchange Eligibility -</span>
                  <span>{p.exchangeOrReturn}</span>
                </div>

              </div>


              {/* Buttons */}
              <div className="flex items-center gap-[8px] mt-[14px]">

                <button
                className={`flex-1 h-[36px] rounded-[8px] text-white text-[13px]
                ${p.status === "Published" ? "bg-[#22C55E]" : "bg-[#1D4ED8]"}`}
                onClick={async () => {
                  try {
                    await axios.patch(
                      `https://assignment-completed.onrender.com/api/product/toggle-status/${p._id}`
                    );
                    fetchProducts();
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                {p.status === "Published" ? "Unpublish" : "Publish"}
              </button>

                <button
                  onClick={() => setEditProduct(p)}
                  className="flex-1 h-[36px] border border-[#D0D5DD] rounded-[8px] text-[13px]"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteProduct(p)}
                  className="w-[36px] h-[36px] border border-[#D0D5DD] rounded-[8px] flex items-center justify-center"
                >
                  🗑
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* Edit Modal */}
      {editProduct && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <EditProduct
            product={editProduct}
            closeModal={() => {
              setEditProduct(null);
              fetchProducts(tab);
            }}
          />

        </div>

      )}


      {/* Delete Modal */}
      {deleteProduct && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[360px] rounded-[10px] shadow-lg">

            <div className="flex justify-between items-center px-5 py-4 border-b">

              <h2 className="text-[15px] font-semibold text-[#344054]">
                Delete Product
              </h2>

              <button
                onClick={() => setDeleteProduct(null)}
                className="text-gray-500 text-[18px]"
              >
                ✕
              </button>

            </div>

            <div className="px-5 py-4">

              <p className="text-[13px] text-[#667085]">
                Are you sure you want to delete
                <span className="font-semibold text-[#344054]">
                  {" "}“{deleteProduct.name}”
                </span> ?
              </p>

            </div>

            <div className="flex justify-end px-5 py-4">

              <button
                onClick={() => handleDelete(deleteProduct._id)}
                className="bg-[#1D4ED8] text-white text-[13px] px-4 py-2 rounded-[6px]"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Home;

