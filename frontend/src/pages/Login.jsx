import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_URL_DOMAIN}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.data.token;
      login(token);
      navigate("/");
    } catch (error) {
        console.error("FULL ERROR", error);
        console.log("error.response", error.response);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan server");
      }
    }
  };

  return (
    <div className="flex justify-center font-lato bg-[#e6e6e6] items-center min-h-screen">
      <form onSubmit={handleLogin} className="border p-6 w-96 rounded-md bg-white bg-opacity-50 backdrop-blur-[5px] shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        
        <label className="block mb-2">
          <span>Email</span>
          <input type="email" name="email" placeholder="Enter Your Email" className="w-full border rounded-md px-2 py-2  mt-1" onChange={handleChange} required/>
        </label>
        <label className="block mb-2">
          <span>Password</span>
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Your Password" className="w-full border rounded-md px-2 py-2 mt-1" onChange={handleChange} required autoComplete="current-password"/>
        </label>
        <label className="block mb-4">
          <input type="checkbox" className="mr-2" onChange={() => setShowPassword((prev) => !prev)}/>
          Show Password
        </label>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {errorMessage}
          </div>
        )}

        <button type="submit" className="w-full border py-2 rounded-lg bg-[#173b71] text-white hover:bg-[#244678]">Submit</button>
        <p className="text-center text-sm mt-4">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 hover:underline">Daftar</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
