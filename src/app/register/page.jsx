"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const colors = {
    primary: "#EC6530",
    light: "#FFAE6E",
    soft: "#FFE3E3",
    sky: "#b7e9ea",
  };

  const validatePassword = (password) => {
    return (/[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    if (!validatePassword(password)) {
      toast.error(
        "Password must have uppercase, lowercase & be 6+ characters"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await authClient.signUp.email({
        email,
        password,
        name,
        image: photo,
      });

      if (res.error) {
        toast.error(res.error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await authClient.signIn.social({
        provider: "google",
      });

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Logged in with Google!");
      router.push("/");
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: `linear-gradient(100deg, ${colors.sky}, ${colors.soft})` }} >
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border-t-4" style={{ borderColor: colors.primary }} >

        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: colors.primary }}> User Registration </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700"> Name </label>
            <input name="name" type="text" className="input input-bordered w-full mt-1" required/>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700"> Email </label>
            <input name="email" type="email" className="input input-bordered w-full mt-1" required />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700"> Photo URL</label>
            <input name="photo" type="text" className="input input-bordered w-full mt-1" required/>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700"> Password </label>
            <input name="password" type="password" className="input input-bordered w-full mt-1" required />
            <p className="text-xs text-gray-500 mt-1"> Must contain uppercase, lowercase & 6+ characters </p>
          </div>

          <button type="submit" disabled={loading} className="w-full py-2 rounded-lg font-semibold text-white transition" style={{ backgroundColor: colors.primary }} > {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border rounded-lg py-2 hover:bg-gray-50 transition" > <FaGoogle size={20} /> Continue with Google</button>
        <p className="text-center text-sm mt-4"> Already have an account?{" "} <a href="/login" className="font-semibold" style={{ color: colors.primary }} > Login</a> </p>
      </div>
    </div>
  );
}