import Sidebar from "../components/Sidebar";
import Navbar1 from "../components/Navbar1";
import Products from "./Products";
import { Outlet } from "react-router-dom";
export default function Dashboard1() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <Navbar1 />

        {/* Page Content */}
        <Products />

      </div>

    </div>
  );
}
