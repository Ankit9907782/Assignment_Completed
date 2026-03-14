import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="w-[240px] bg-[#1D222B] text-white flex flex-col p-4">

      <div className="text-xl font-semibold mb-6">
        Productr
      </div>

      {/* Search */}
      <input
        placeholder="Search"
        className="bg-[#1E293B] p-2 rounded mb-6 text-sm"
      />

      <div className="flex flex-col gap-8 w-[224px] h-72px] text-gray-300">

        <div className="cursor-pointer">
  <Link 
    to="/dashboard"
    className="flex items-center gap-2 text-gray-400 hover:text-white"
  >
    <img src="/Home.png" alt="home" className="w-5 h-5" />
    <span>Home</span>
  </Link>
</div>

        <div className="cursor-pointer">
  <Link 
    to="/products"
    className="flex items-center gap-2 text-gray-400 hover:text-white"
  >
    <img src="/Shopping-bag.png" alt="home" className="w-5 h-5" />
    <span>Products</span>
  </Link>
</div>

      </div>
    </div>
  );
}
export default Sidebar;