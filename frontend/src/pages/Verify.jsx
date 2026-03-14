
// src/App.jsx
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Verify() {

const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email;

const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const verifyOtp = async () => {

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    try {

      await axios.post(
        "https://assignment-completed.onrender.com/api/auth/verify-otp",
        {
          email: email,
          otp: finalOtp
        }
      );
     
      // redirect to dashboard
      navigate("/dashboard");

    } catch (err) {

      alert("Invalid OTP");

    }

  };

  return (
    <div className="flex h-[1024px] w-[1440px]">
      

  <div className="w-[718px] h-[960px] m-[32px] rounded-[32px] overflow-hidden relative">

  <div className="absolute inset-0 bg-[url('/imag.png')] bg-cover bg-center z-0"></div>

  <div className="absolute inset-0 bg-[linear-gradient(180deg,#010860_0%,#002283_19.23%,#734AA3_38.46%,#E7959C_57.21%,#E4A182_76.92%,#BF3613_100%)] opacity-60 z-10"></div>

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




      <div className="relative w-[718px] h-[1024px] m-[32px] bg-white  flex flex-col items-center">

  <h1 className="mt-[202px] font-bold text-[24px] leading-[29px] w-[363px] text-center">
    Login to your Productr Account
  </h1>

<div className="absolute flex flex-col gap-2 w-[376px] top-[271px] left-[171px]">

  <p className="font-medium text-[14px] leading-[14px] tracking-normal text-black">
    Email or Phone number
  </p>

  <div className="flex gap-4 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-[48px] h-[48px] text-center border rounded-lg focus:outline-none focus:border-blue-600"
          />
        ))}
      </div>

<button
onClick={verifyOtp}
className="w-[376px] h-[40px] bg-[#071074] text-white rounded-lg hover:bg-[#0d148f] transition">
        Enter your OTP
      </button>

      <p className="mt-6 text-gray-400 text-center">
        Didn’t recieve OTP ?{" "}
        <span className="text-blue-600 font-medium cursor-pointer">
          Resend in 20s
        </span>
      </p>

</div>

 
</div>
</div>
  );
}

export default Verify;

