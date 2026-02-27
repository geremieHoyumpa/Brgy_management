import { useState } from "react";
import { Building2 } from 'lucide-react';
import { loginWithUsername } from '../services/authService';
import type { SyntheticEvent } from "react"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()//page would not refresh when log in is click, page will reload by default it is the default behavior of form when submitted
    setLoading(true)//for the button to be disable purpose when clicked

    try{
      const {role} = await loginWithUsername(username, password)

      if(role == "admin"){
        alert("Admin Logged in")
      }else{
        alert("Invalid user")
      }
        
    }catch(error: any){
      alert(error.message)
    }

    setLoading(false)
  }
// #FFD786   
  return (
    <div className="h-screen w-screen bg-[#FFD786] flex items-center justify-center p-10">
      {/* Desktop: two-column layout / Mobile: single card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row relative">

        {/* Left panel — hero / branding (hidden on mobile) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#237227] text-white w-1/2 p-12 gap-6 relative">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40">
            <Building2 className="w-14 h-14 text-white" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Barangay System</h2>
            <p className="mt-2 text-white/70 text-sm leading-relaxed max-w-xs">
              Official management portal for barangay records, residents, and services.
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        </div>

        {/* Right panel — form */}
        <div className="flex flex-col justify-center p-8 md:p-12 w-full md:w-1/2 relative z-10">

          {/* Mobile-only icon + title */}
          <div className="flex flex-col items-center mb-8 md:hidden">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#237227]">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <p className="mt-4 text-4xl sm:text-6xl font-bold text-[#237227] pb-4">Barangay System</p>
            <p className="text-sm text-gray-500">Login to continue</p>
          </div>  

          {/* Desktop heading */}
          <div className="hidden md:block mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your credentials to access the portal.</p>
          </div>

          <form className="flex flex-col gap-5"
            onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#519A66] text-sm text-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#519A66] text-sm text-black"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-[#519A66]" />
                Remember me
              </label>
              <a href="#" className="text-[#237227] hover:underline font-medium">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="bg-[#519A66] hover:bg-[#237227] text-white py-2.5 rounded-lg font-semibold transition duration-200 text-sm mt-1"
              disabled={loading}//disable the button when loading is true or clicked
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            © {new Date().getFullYear()} Barangay System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}