import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
// import OtpPage from "./pages/Verify";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import Dashboard1 from "./pages/Dashboard1";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* OTP Verification */}
        <Route path="/otp" element={<Verify />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
         <Route index element={<Home />} />
         <Route path="products" element={<Dashboard1 />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;