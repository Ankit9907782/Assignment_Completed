import { useState } from "react";

function Home() {

  const [tab, setTab] = useState("published");

  return (
    <div className="flex-1 p-6 bg-gray-50">

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2 mb-10">

        <button
          onClick={() => setTab("published")}
          className={`pb-2 ${
            tab === "published"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-400"
          }`}
        >
          Published
        </button>

        <button
          onClick={() => setTab("unpublished")}
          className={`pb-2 ${
            tab === "unpublished"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-400"
          }`}
        >
          Unpublished
        </button>

      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">

        <div className="text-[#0F1C7A] text-5xl mb-6">
          <img
          src="/imag3.png"
          alt="profile"
          className="w-[100px] h-[100px]  object-cover"
        />
        </div>

        <h2 className="text-lg font-semibold text-gray-700">
          No Published Products
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Your Published Products will appear here
        </p>

        <p className="text-gray-400 text-sm">
          Create your first product to publish
        </p>

      </div>

    </div>
  );
}
export default Home;