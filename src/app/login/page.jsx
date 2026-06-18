"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import React from 'react';
import { setAuthToken} from '@/lib/jwt-utils';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [loading, setLoading] = useState(false);

  const colors = {
    primary: "#EC6530",
    light: "#FFAE6E",
    soft: "#FFE3E3",
    sky: "#b7e9ea",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      setLoading(true);
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        toast.error(res.error.message || "Invalid credentials");
        return;
      }

      try {
        const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        let jwtData;
        
        if (loginRes.ok) {
          jwtData = await loginRes.json();
        } else {
          const registerRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name: email.split('@')[0],
              email, 
              password 
            }),
          });
          
          if (!registerRes.ok) {
            toast.success("Login successful!");
            router.push(redirect || "/");
            return;
          }
          
          jwtData = await registerRes.json();
        }

        if (jwtData.token) {
          setAuthToken(jwtData.token);
        }
      } catch (error) {
        console.error("JWT token fetch error:", error);
      }

      toast.success("Login successful!");
      router.push(redirect || "/");
      
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect || "/",
      });

      if (res.error) {
        toast.error(res.error.message || "Google login failed");
        return;
      }
      const session = await authClient.getSession();
      
      if (session.data) {
        const { user } = session.data;
        const jwtResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/social-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            photo: user.image,
            provider: 'google',
            providerId: user.id,
          }),
        });

        if (jwtResponse.ok) {
          const jwtData = await jwtResponse.json();
          if (jwtData.token) {
            setAuthToken(jwtData.token);
            setUserData(jwtData.user);
          }
        }
      }

      toast.success("Redirecting...");
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" 
         style={{ background: `linear-gradient(100deg, ${colors.sky}, ${colors.soft})` }}>
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border-t-4" 
           style={{ borderColor: colors.primary }}>
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: colors.primary }}>
          User Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input name="email" type="email" required className="input input-bordered w-full mt-1" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input name="password" type="password" required className="input input-bordered w-full mt-1" />
          </div>

          <div className="text-right">
            <Link href="/" className="text-sm hover:underline" style={{ color: colors.primary }}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading} 
                  className="w-full py-2 rounded-lg font-semibold text-white transition" 
                  style={{ backgroundColor: colors.primary }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button onClick={handleGoogle} 
                className="w-full flex items-center justify-center gap-3 border rounded-lg py-2 hover:bg-gray-50 transition">
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="text-center text-sm mt-5">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold" style={{ color: colors.primary }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;