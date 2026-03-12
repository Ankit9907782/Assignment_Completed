import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Home from "./Home";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <Home />

      </div>

    </div>
  );
}
