
import { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";
import { Toaster, toast } from "react-hot-toast";

export default function ProductCard() {
   const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  // Fetch products
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
   const showToast = (message) => {
    toast.success(message, {
      position: "top-left",
      style: {
        width: "317px",
        height: "48px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        padding: "8px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      icon: "✅",
    });
  };

  return (
    <div className="flex-1 bg-[#F5F6FA] p-[24px]">

      {/* Header */}
      <div className="flex justify-between items-center mb-[16px]">

        <h1 className="text-[18px] font-semibold text-[#344054]">
          Products
        </h1>

        <button onClick={() => setOpen(true)} className="text-[#4F46E5] text-[14px] font-medium">
          + Add Products
        </button>

      </div>


      {/* Product Grid */}
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
                  src={`http://localhost:5000${p.images[0]}`}
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
                      `http://localhost:5000/api/product/toggle-status/${p._id}`
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


      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <EditProduct
            product={editProduct}
            closeModal={() => {
              setEditProduct(null);
              fetchProducts();
            }}
          />

        </div>
      )}


      {/* Delete Modal */}
      {deleteProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <DeleteProduct
            product={deleteProduct}
            closeModal={() => setDeleteProduct(null)}
            refresh={fetchProducts}
          />

        </div>
      )}
 {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 
flex justify-center items-start overflow-y-auto pt-10">

          <AddProduct closeModal={() => setOpen(false) } showToast={showToast} />

        </div>
      )}
    </div>
  );
}

