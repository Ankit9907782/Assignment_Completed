
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddProduct({ closeModal,showToast}) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    type: "Foods",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    exchangeOrReturn: "Yes"
  });

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

    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFiles = imageFiles.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  const handleSubmit = async () => {

    try {

      const data = new FormData();

      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("quantityStock", formData.quantityStock);
      data.append("mrp", formData.mrp);
      data.append("sellingPrice", formData.sellingPrice);
      data.append("brandName", formData.brandName);
      data.append("exchangeOrReturn", formData.exchangeOrReturn);

      imageFiles.forEach((file) => {
        data.append("images", file);
      });

      const res = await axios.post(
        "https://assignment-completed.onrender.com/api/product/create",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Product created successfully");

      closeModal();
       navigate("/productcard")
    } catch (err) {

      console.log(err.response?.data);
      alert("Failed to create product");

    }

  };

  return (
    <div className="w-[472px] bg-white rounded-[8px] shadow-xl overflow-hidden">

      {/* Header */}
      <div className="h-[56px] flex items-center justify-between px-[24px] border-b border-[#DCDFE3]">
        <h2 className="text-[16px] font-medium text-[#344054]">
          Add Product
        </h2>

        <button onClick={closeModal} className="text-[#667085] text-[18px]">
          ✕
        </button>
      </div>

      <div className="p-[24px] flex flex-col gap-[16px]">

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] text-[#344054]">Product Name</label>
          <input
            name="name"
            onChange={handleChange}
            className="h-[40px] border border-[#D0D5DD] rounded-[8px] px-[12px]"
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] text-[#344054]">Product Type</label>
          <select
            name="type"
            onChange={handleChange}
            className="h-[40px] border border-[#D0D5DD] rounded-[8px] px-[12px]"
          >
            <option>Foods</option>
            <option>Electronics</option>
            <option>Clothes</option>
            <option>Beauty Products</option>
            <option>Others</option>

          </select>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] text-[#344054]">Quantity Stock</label>
          <input
            name="quantityStock"
            onChange={handleChange}
            className="h-[40px] border border-[#D0D5DD] rounded-[8px] px-[12px]"
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] text-[#344054]">MRP</label>
          <input
            name="mrp"
            onChange={handleChange}
            className="h-[40px] border border-[#D0D5DD] rounded-[8px] px-[12px]"
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] text-[#344054]">Selling Price</label>
          <input
            name="sellingPrice"
            onChange={handleChange}
            className="h-[40px] border border-[#D0D5DD] rounded-[8px] px-[12px]"
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] text-[#344054]">Brand Name</label>
          <input
            name="brandName"
            onChange={handleChange}
            className="h-[40px] border border-[#D0D5DD] rounded-[8px] px-[12px]"
          />
        </div>

        {/* Upload images section (your design unchanged) */}
        <div className="flex flex-col gap-[6px]">

          <div className="flex justify-between items-center">
            <label className="text-[14px] text-[#344054]">
              Upload Product Images
            </label>

            <label className="text-[13px] text-[#4F46E5] cursor-pointer">
              Add More Photos
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </div>

          <div className="w-full min-h-[80px] border border-dashed border-[#D0D5DD] rounded-[8px] p-[10px] flex items-center justify-center  gap-[10px] flex-wrap">

            {images.length === 0 && (
              <label className="cursor-pointer flex flex-col items-center gap-[4px]">
  {/* Enter Description */}
  <span className="w-[115px] h-[17px] text-[14px] font-normal leading-[100%] text-[#98A2B3] text-center">
    Enter Description
  </span>

  {/* Browse */}
  <span className="w-[115px] h-[17px] text-[14px] font-semibold leading-[100%] text-[#344054] text-center">
    Browse
  </span>

  <input
    type="file"
    multiple
    accept="image/*"
    className="hidden"
    onChange={handleUpload}
  />
</label>
            )}

            {images.map((img, index) => (
              <div key={index} className="relative w-[62px] h-[58px] border rounded-[6px] overflow-hidden">

                <img
                  src={img}
                  alt="product"
                  className="absolute w-[47.57px] h-[48px] top-[4.89px] left-[7.22px] object-cover"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute w-[20px] h-[20px] top-[-5px] left-[49px] bg-white border border-[#DCDFE3] rounded-full flex items-center justify-center text-[12px]"
                >
                  ✕
                </button>

              </div>
            ))}

          </div>

        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] text-[#344054]">
            Exchange or return eligibility
          </label>

          <select
            name="exchangeOrReturn"
            onChange={handleChange}
            className="h-[40px] border border-[#D0D5DD] rounded-[8px] px-[12px]"
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

      </div>

      <div className="h-[72px] bg-[#F7F8FA] border-t border-[#DCDFE3] flex items-center justify-end px-[24px] rounded-b-[8px]">

        <button
          onClick={handleSubmit}
          className="w-[96px] h-[40px] rounded-[8px] text-white
          bg-[linear-gradient(180deg,#000FB4_13.75%,#4050FF_135%)]"
        >
          Create
        </button>

      </div>

    </div>
  );
}

