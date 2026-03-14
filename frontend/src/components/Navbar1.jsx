function Navbar1() {
  return (
    <div className="w-[1200px] h-[64px] flex items-center justify-between px-6
    bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200">

      {/* Left Side */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400"><img src="/Shopping-bag.png" alt="home" className="w-5 h-5" /></span>
        <h1 className="text-gray-700 font-medium">Products</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <img
          src="/imag2.jpg"
          alt="profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-gray-600">⌄</span>
      </div>

    </div>
  );
}

export default Navbar1;