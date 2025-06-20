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
      const res = await axios.post("http://localhost:5000/api/auth/login", {
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
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="border p-6 w-80 rounded-md shadow-md"
      >
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>

        <label className="block mb-2">
          <span>Email</span>
          <input
            type="email"
            name="email"
            className="w-full border px-2 py-1 mt-1"
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-2">
          <span>Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full border px-2 py-1 mt-1"
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-4">
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
          className="w-full border py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </button>

        <p className="text-center text-sm mt-4">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
