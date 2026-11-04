import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect straight to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const success = login(username, password);
    if (success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setErrorMsg("Invalid username or password. Please verify your credentials.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-body">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-[#D4AF77] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 bg-[#641E2B] pointer-events-none" />

      {/* Back to Site Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#D4AF77]/30 text-xs font-semibold uppercase tracking-wider text-[#3A211C] hover:bg-white shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#641E2B]" />
          <span>Return to Wedding Celebration</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Monogram Seal & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#641E2B] via-[#4E1420] to-[#D4AF77] shadow-[0_10px_30px_rgba(100,30,43,0.3)] border-4 border-white mb-4">
            <span
              className="text-4xl text-white font-bold"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              AvNit
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF77]">
              Patni Family Secret Portal
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
          </div>

          <h1 className="font-display italic text-3xl sm:text-4xl text-[#3A211C]">
            Admin Sanctuary
          </h1>
          <p className="text-xs text-[#3A211C]/60 mt-1 max-w-xs mx-auto">
            Manage sacred invitation details, multi-page ceremonies &amp; celebratory photo folders
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#D4AF77]/40 shadow-[0_20px_50px_rgba(58,33,28,0.08)] relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 text-center font-medium"
              >
                {errorMsg}
              </motion.div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#641E2B]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-sm text-[#3A211C] placeholder-[#3A211C]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF77] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A211C] mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#641E2B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#FFFDFB] border border-[#D4AF77]/40 text-sm text-[#3A211C] placeholder-[#3A211C]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF77] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#3A211C]/50 hover:text-[#3A211C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#641E2B] via-[#521923] to-[#3A211C] text-white text-xs font-semibold uppercase tracking-widest shadow-[0_10px_25px_rgba(100,30,43,0.3)] hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF77]" />
              <span>Unlock Admin Sanctuary</span>
            </button>
          </form>

          {/* Discreet Footer Security Notice */}
          <div className="mt-6 pt-5 border-t border-[#D4AF77]/20 text-center">
            <p className="text-[10px] uppercase tracking-wider text-[#3A211C]/40">
              AvNit • Authorized Family Access Only
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

