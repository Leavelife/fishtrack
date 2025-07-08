import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password tidak cocok");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.data.token;
      login(token); // langsung auto login
      navigate("/"); // arahkan ke beranda
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan saat register");
      }
    }
  };

  return (
    <div className="flex justify-center font-lato bg-[#e9e9e9] items-center min-h-screen">
      <form onSubmit={handleRegister} className="border p-6 w-96 bg-white bg-opacity-50 backdrop-blur-[5px] rounded-md shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4">Register</h2>

        <label className="block mb-2">
          <span>Nama</span>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="w-full border rounded-md px-2 py-2 mt-1"
            onChange={handleChange}
            required
            />
        </label>

        <label className="block mb-2">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="w-full border rounded-md px-2 py-2 mt-1"
            onChange={handleChange}
            required
            />
        </label>

        <label className="block mb-2">
          <span>Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            className="w-full border rounded-md px-2 py-2 mt-1"
            onChange={handleChange}
            required
            />
        </label>

        <label className="block mb-4">
          <span>Konfirmasi Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Enter Your Konfirm Password"
            className="w-full border rounded-md px-2 py-2 mt-1"
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-3">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => setShowPassword((prev) => !prev)}
          />
          Show Password
        </label>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full border py-2 rounded-lg bg-[#173b71] text-white hover:bg-[#27497b]"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
