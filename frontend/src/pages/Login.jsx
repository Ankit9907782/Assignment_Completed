
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {

    if (!emailOrPhone) {
      setError("Please enter email");
      return;
    }

    try {

      await axios.post(
        "https://assignment-completed.onrender.com/api/auth/send-otp",
        { email: emailOrPhone }
      );
      
      navigate("/otp", { state: { email: emailOrPhone } });
      

    } catch (err) {

      setError("Failed to send OTP");

    }
  };

  return (
    <div className="flex h-[1024px] w-[1440px]">

      {/* LEFT SIDE (unchanged) */}
      <div className="w-[718px] h-[960px] m-[32px] rounded-[32px] overflow-hidden relative">

        <div className="absolute inset-0 bg-[url('/imag.png')] bg-cover bg-center z-0"></div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,#010860_0%,#002283_19.23%,#734AA3_38.46%,#E7959C_57.21%,#E4A182_76.92%,#BF3613_100%)] opacity-60 z-10"></div>

        <div className="absolute flex flex-col 
        w-[312px] h-[480px] 
        top-[240px] left-[189px] 
        rounded-[48px] border-2 overflow-hidden">

          <img src="/imag1.jpg" alt="Runner" className="w-full h-full object-cover"/>

          <p className="absolute bottom-6 text-white text-center w-full text-sm">
            Uplist your product to market
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-[718px] h-[1024px] m-[32px] bg-white flex flex-col items-center">

        <h1 className="mt-[202px] font-bold text-[24px] leading-[29px] w-[363px] text-center">
          Login to your Productr Account
        </h1>

        <div className="absolute flex flex-col gap-2 w-[376px] top-[271px] left-[171px]">

          <p className="font-medium text-[14px] leading-[14px] text-black">
            Email or Phone number
          </p>

          <input
            type="text"
            placeholder="Enter email or phone number"
            value={emailOrPhone}
            onChange={(e)=>setEmailOrPhone(e.target.value)}
            className="w-[376px] h-[40px] border rounded-[8px] p-2 text-base"
          />

          <button
            onClick={sendOtp}
            className="w-[376px] h-[40px] rounded-[8px] bg-[#071074] text-white text-lg hover:bg-[#05095a]"
          >
            Login
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

        </div>

      </div>

    </div>
  );
}

export default Login;

