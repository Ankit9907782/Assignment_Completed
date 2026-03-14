function Navbar() {
  return (
    <div className="w-[1200px] h-[64px] flex items-center justify-end px-6
     bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200">

      <div className="flex items-center gap-2">
        <img
          src="/imag2.jpg"
          className="w-8 h-8 rounded-full"
        />
        <span>⌄</span>
      </div>

    </div>
  );
}
export default Navbar;