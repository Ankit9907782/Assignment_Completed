import { useState } from "react";
import AddProduct from "./AddProduct";

export default function ProductsPage() {

  const [open, setOpen] = useState(false);

  return (

    <div className="flex-1 bg-[#F5F6FA] p-10 flex flex-col relative">

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center flex-1">

        <div className="w-[335px] h-[254px] flex flex-col items-center gap-[24px]">

          {/* Image */}
          <img
            src="/imag3.png"
            alt="icon"
            className="w-[100px] h-[100px]"
          />

          {/* Text Block */}
          <div className="w-[335px] h-[66px] flex flex-col gap-[16px] items-center">

            <h2 className="text-[16px] font-semibold text-[#344054] text-center">
              Feels a little empty over here...
            </h2>

            <p className="text-[14px] leading-[16px] text-center text-[#98A2B3] font-normal">
              You can create products without connecting store
              <br />
              you can add products to store anytime
            </p>

          </div>

          {/* Button */}
          <button
            onClick={() => setOpen(true)}
            className="w-[315px] h-[40px] rounded-[8px] text-white
            bg-[linear-gradient(180deg,#000FB4_13.75%,#4050FF_135%)]
            hover:opacity-90 flex items-center justify-center"
          >
            Add your Products
          </button>

        </div>

      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 
flex justify-center items-start overflow-y-auto pt-10">

          <AddProduct closeModal={() => setOpen(false)} />

        </div>
      )}

    </div>
  );
}