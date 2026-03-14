
import axios from "axios";

export default function DeleteProduct({ product, closeModal, refresh }) {

  const handleDelete = async () => {
    try {

      await axios.delete(
        `http://localhost:5000/api/product/delete/${product._id}`
      );

      refresh(); // reload products
      closeModal();

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (

    <div className="w-[400px] h-[191px] bg-white rounded-[10px] shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 ">

        <h2 className="text-[15px] font-semibold text-[#344054]">
          Delete Product
        </h2>

        <button
          onClick={closeModal}
          className="text-gray-500 text-[18px]"
        >
          ✕
        </button>

      </div>


      {/* Body */}
      <div className="px-5 py-4">

        <p className="text-[13px] text-[#667085]">
          Are you sure you really want to delete this Product
          <span className="font-semibold text-[#344054]">
            {" "}“{product.name}”
          </span> ?
        </p>

      </div>


      {/* Footer */}
      <div className="flex justify-end px-5 py-4">

        <button
  onClick={handleDelete}
  className=" w-[76px] h-[40px] bg-gradient-to-b from-[#000FB4] to-[#4050FF] text-white text-[13px] px-4 py-2 rounded-[6px]"
>
  Delete
</button>

      </div>

    </div>

  );
}

