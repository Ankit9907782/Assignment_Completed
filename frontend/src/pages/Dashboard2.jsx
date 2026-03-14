import Sidebar from "../components/Sidebar";
import Navbar1 from "../components/Navbar1";
import ProductCard from "./ProductCard";
import { Outlet } from "react-router-dom";
export default function Dashboard2() {
  return (
    <div className="flex w-[1440px] h-[1024px] bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <Navbar1 />

        {/* Page Content */}
        <ProductCard />

      </div>

    </div>
  );
}
