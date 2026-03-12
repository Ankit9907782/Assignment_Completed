export default function ProductsPage() {
  return (
    <div className="flex-1 bg-[#F5F6FA] p-10 flex flex-col">

      {/* Page Header */}
      {/* <div className="flex items-center mb-10">
        <span className="text-gray-400 mr-2">🔒</span>
        <h1 className="text-gray-700 font-medium">Products</h1>
      </div> */}

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">

        {/* Icon */}
        <div className="text-[#0F1C7A] text-5xl mb-6">
          <img
          src="/imag3.png"
          alt="profile"
          className="w-[100px] h-[100px]  object-cover"
        />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Feels a little empty over here...
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6">
          You can create products without connecting store
          <br />
          you can add products to store anytime
        </p>

        {/* Button */}
        <button className="px-10 py-3 rounded-lg text-white
        bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90">
          Add your Products
        </button>

      </div>

    </div>
  );
}