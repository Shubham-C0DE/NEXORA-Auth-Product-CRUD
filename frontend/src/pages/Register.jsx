import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to create account.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070707] px-6 py-10 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 shadow-lg shadow-amber-400/10">
              <span className="text-lg font-black text-black">
                N
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Create your NEX
            <span className="text-amber-400">ORA</span>
            account
          </h1>

          <p className="mt-2 text-sm text-white/35">
            Create an account to manage your workspace.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Full name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30 transition hover:text-amber-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Confirm password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30 transition hover:text-amber-400"
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-400 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 border-t border-white/[0.06] pt-6 text-center">
            <p className="text-sm text-white/30">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="mt-2 inline-block text-sm font-medium text-amber-400 transition hover:text-amber-300"
            >
              Sign in to NEXORA
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          NEXORA · Secure workspace management
        </p>
      </div>
    </main>
  );
};

export default Register;