import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const idToken = await user.getIdToken();
      const res = await axios.post(`${import.meta.env.VITE_URL_DOMAIN}/api/auth/firebase-login`, {
        idToken
      });
      localStorage.setItem("accessToken", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      login(res.data.user.role);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan server");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth);
      const idToken = await result.user.getIdToken();

      // Kirim ID token ke backend untuk verifikasi dan buat akun jika perlu
      const res = await axios.post(`${import.meta.env.VITE_URL_DOMAIN}/api/auth/google-login`, {
        idToken,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      alert("Login berhasil!");

    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  return (
    <div className="flex justify-center font-lato bg-[#e6e6e6] items-center min-h-screen">
      <div className="border p-6 w-96 rounded-md bg-white bg-opacity-50 backdrop-blur-[5px] shadow-md"> 
        <form onSubmit={handleLogin} className="">
          <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
          
          <label className="block mb-2">
            <span>Email</span>
            <input type="email" name="email" placeholder="Enter Your Email" className="w-full border rounded-md px-2 py-2  mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </label>
          <label className="block mb-2">
            <span>Password</span>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Your Password" className="w-full border rounded-md px-2 py-2 mt-1" value={password} onChange={(e) => setPassword(e.target.value) } required autoComplete="current-password"/>
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
        {/* <div className="login-page">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
