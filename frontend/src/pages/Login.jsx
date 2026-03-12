// src/App.jsx
import { useState } from "react";

function Login() {
const [step, setStep] = useState(1); // 1=Email/Phone, 2=OTP
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (!emailOrPhone) return setError("Please enter email or phone");
    setError("");
    setStep(2);
  };

  return (
    <div className="flex h-[1024px] w-[1440px]">
      

  <div className="w-[718px] h-[960px] m-[32px] rounded-[32px] overflow-hidden relative">

  {/* Background Pattern */}
  <div className="absolute inset-0 bg-[url('/imag.png')] bg-cover bg-center z-0"></div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-[linear-gradient(180deg,#010860_0%,#002283_19.23%,#734AA3_38.46%,#E7959C_57.21%,#E4A182_76.92%,#BF3613_100%)] opacity-60 z-10"></div>

  {/* Center Runner Card */}
  <div className="absolute flex flex-col 
w-[312px] h-[480px] 
top-[240px] left-[189px] 
rounded-[48px] border-2 
overflow-hidden ">

  <img
    src="/imag1.jpg"
    alt="Runner"
    className="w-full h-full object-cover"
  />

  <p className="absolute bottom-6 text-white text-center w-full text-sm">
    Uplist your product to market
  </p>

</div>

</div>




      {/* Right Section: Login Card */}
      <div className="relative w-[718px] h-[1024px] m-[32px] bg-white  flex flex-col items-center">
  {/* Title */}
  <h1 className="mt-[202px] font-bold text-[24px] leading-[29px] w-[363px] text-center">
    Login to your Productr Account
  </h1>

  {/* Form */}
<div className="absolute flex flex-col gap-2 w-[376px] top-[271px] left-[171px]">
  {/* Label */}
  <p className="font-medium text-[14px] leading-[14px] tracking-normal text-black">
    Email or Phone number
  </p>

  {/* Input */}
      <input
        type="text"
        placeholder="Enter email or phone number"
        className="w-[376px] h-[40px] border rounded-[8px] p-2 text-base"
      />
      <button className="w-[376px] h-[40px] rounded-[8px] bg-[#071074] text-white text-lg hover:bg-[#05095a]">
        Login
      </button>
    </div>

    {/* Signup Card */}
    <div className="absolute bottom-16 w-[380px] h-[80px] bg-white rounded-lg shadow flex flex-col items-center justify-center gap-3">
      <p className="text-sm text-gray-500">Don't have a Productr Account?</p>
      <button className="text-[#071074] font-semibold">Sign Up Here</button>
    </div>
</div>
</div>

  );
}

export default Login;