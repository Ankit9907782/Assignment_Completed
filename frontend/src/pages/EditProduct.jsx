
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProduct({ product, closeModal }) {

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    exchangeOrReturn: "Yes"
  });

  useEffect(() => {

    if (product) {

      setFormData({
        name: product.name || "",
        type: product.type || "",
        quantityStock: product.quantityStock || "",
        mrp: product.mrp || "",
        sellingPrice: product.sellingPrice || "",
        brandName: product.brandName || "",
        exchangeOrReturn: product.exchangeOrReturn || "Yes"
      });

      if (product.images) {
        const existingImages = product.images.map(
          (img) => `https://assignment-completed.onrender.com${img}`
        );
        setImages(existingImages);
      }

    }

  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpload = (e) => {

    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImages([...images, ...previews]);
    setImageFiles([...imageFiles, ...files]);

  };

  const removeImage = (index) => {

    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

  };

  const handleSubmit = async () => {

    try {

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      imageFiles.forEach((file) => {
        data.append("images", file);
      });

      await axios.put(
        `https://assignment-completed.onrender.com/api/product/edit/${product._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Product updated successfully");

      closeModal();

    } catch (err) {

      console.log(err);
      alert("Update failed");

    }

  };

  return (

    <div className="w-[472px] max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-[#DCDFE3]">

        <h2 className="text-[16px] font-medium text-[#344054]">
          Edit Product
        </h2>

        <button
          onClick={closeModal}
          className="text-[#667085] text-[18px]"
        >
          ✕
        </button>

      </div>


      {/* Form */}
      <div className="p-6 flex flex-col gap-4 overflow-y-auto">

        {/* Product Name */}
        <div>
          <label className="text-[13px] text-[#344054]">
            Product Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-[40px] border border-[#D0D5DD] rounded-lg px-3 mt-1"
          />
        </div>


        {/* Product Type */}
        <div>

          <label className="text-[13px] text-[#344054]">
            Product Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full h-[40px] border border-[#D0D5DD] rounded-lg px-3 mt-1"
          >

            <option>Foods</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Beauty</option>

          </select>

        </div>


        {/* Quantity */}
        <div>

          <label className="text-[13px] text-[#344054]">
            Quantity Stock
          </label>

          <input
            name="quantityStock"
            value={formData.quantityStock}
            onChange={handleChange}
            className="w-full h-[40px] border border-[#D0D5DD] rounded-lg px-3 mt-1"
          />

        </div>


        {/* MRP */}
        <div>

          <label className="text-[13px] text-[#344054]">
            MRP
          </label>

          <input
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            className="w-full h-[40px] border border-[#D0D5DD] rounded-lg px-3 mt-1"
          />

        </div>


        {/* Selling Price */}
        <div>

          <label className="text-[13px] text-[#344054]">
            Selling Price
          </label>

          <input
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="w-full h-[40px] border border-[#D0D5DD] rounded-lg px-3 mt-1"
          />

        </div>


        {/* Brand */}
        <div>

          <label className="text-[13px] text-[#344054]">
            Brand Name
          </label>

          <input
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full h-[40px] border border-[#D0D5DD] rounded-lg px-3 mt-1"
          />

        </div>


        {/* Images */}
        <div>

          <div className="flex justify-between items-center mb-2">

            <label className="text-[13px] text-[#344054]">
              Upload Product Images
            </label>

            <label className="text-[13px] text-blue-600 cursor-pointer">
              Add More Photos
              <input
                type="file"
                multiple
                hidden
                onChange={handleUpload}
              />
            </label>

          </div>

          <div className="border border-dashed border-[#D0D5DD] rounded-lg p-3 flex gap-3">

            {images.map((img, index) => (

              <div key={index} className="relative">

                <img
                  src={img}
                  className="w-[60px] h-[60px] object-cover rounded"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-[20px] h-[20px] bg-white border border-[#DCDFE3] rounded-full text-[12px]"
                >
                  ✕
                </button>

              </div>

            ))}

          </div>

        </div>


        {/* Exchange */}
        <div>

          <label className="text-[13px] text-[#344054]">
            Exchange or return eligibility
          </label>

          <select
            name="exchangeOrReturn"
            value={formData.exchangeOrReturn}
            onChange={handleChange}
            className="w-full h-[40px] border border-[#D0D5DD] rounded-lg px-3 mt-1"
          >

            <option>Yes</option>
            <option>No</option>

          </select>

        </div>

      </div>


      {/* Footer */}
      <div className="h-[72px] bg-[#F7F8FA] border-t border-[#DCDFE3] flex items-center justify-end px-6">

        <button
          onClick={handleSubmit}
          className="w-[96px] h-[40px] rounded-lg text-white
          bg-gradient-to-b from-[#000FB4] to-[#4050FF]"
        >
          Update
        </button>

      </div>

    </div>

  );
}

