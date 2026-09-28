import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import { useAuth } from "../context/useAuth";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // Save both tokens
      login(accessToken, refreshToken);

      // Success notification
      toast.success("Welcome back! Login successful.");

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* Background */}

      <div className="pointer-events-none fixed inset-0">
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

      <div className="relative flex min-h-screen">
        {/* LEFT SIDE */}

        <section className="relative hidden items-center px-16 lg:flex lg:w-[55%] xl:px-24">
          <div className="max-w-xl">
            {/* Logo */}

            <div className="mb-16 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400">
                <span className="text-xl font-black text-black">
                  N
                </span>
              </div>

              <span className="text-xl font-semibold tracking-tight">
                NEX<span className="text-amber-400">ORA</span>
              </span>
            </div>

            {/* Badge */}

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Secure workspace
              </span>
            </div>

            {/* Heading */}

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] xl:text-7xl">
              Everything you need.
              <br />
              <span className="text-white/35">
                One place.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-7 text-white/45">
              Manage your products, track your inventory and keep your
              workspace organized from one beautiful dashboard.
            </p>

            {/* Stats */}

            <div className="mt-14 flex items-center gap-10">
              <div>
                <p className="text-2xl font-semibold">
                  24/7
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Access anywhere
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <p className="text-2xl font-semibold">
                  Secure
                </p>

                <p className="mt-1 text-xs text-white/35">
                  JWT authentication
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <p className="text-2xl font-semibold">
                  Fast
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Built for speed
                </p>
              </div>
            </div>
          </div>

          {/* Decorative circles */}

          <div className="absolute right-[-180px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-white/[0.04]" />

          <div className="absolute right-[-80px] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full border border-amber-400/[0.08]" />
        </section>

        {/* RIGHT SIDE */}

        <section className="flex w-full items-center justify-center px-5 py-10 lg:w-[45%]">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}

            <div className="mb-12 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400">
                <span className="text-xl font-black text-black">
                  N
                </span>
              </div>

              <span className="text-xl font-semibold">
                NEX<span className="text-amber-400">ORA</span>
              </span>
            </div>

            {/* Card */}

            <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-7 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-9">
              {/* Heading */}

              <div className="mb-8">
                <p className="mb-3 text-sm font-medium text-amber-400">
                  Welcome back
                </p>

                <h2 className="text-3xl font-semibold tracking-tight">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm text-white/35">
                  Enter your credentials to continue.
                </p>
              </div>

              {/* Login Form */}

              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >
                {/* Email */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/55">
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="h-13 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/60 focus:ring-4 focus:ring-amber-400/5"
                  />
                </div>

                {/* Password */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-white/55">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs text-amber-400 transition hover:text-amber-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      className="h-13 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 pr-16 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/60 focus:ring-4 focus:ring-amber-400/5"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30 transition hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember */}

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-amber-400"
                  />

                  <span className="text-xs text-white/40">
                    Remember me for 30 days
                  </span>
                </div>

                {/* Error */}

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 h-13 w-full overflow-hidden rounded-xl bg-amber-400 text-sm font-semibold text-black transition hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/10 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading
                      ? "Signing in..."
                      : "Sign in"}

                    {!loading && (
                      <span className="text-base transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.07]" />

                <span className="text-[10px] uppercase tracking-widest text-white/20">
                  New here?
                </span>

                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>

              {/* Register */}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm font-medium text-white/70 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
              >
                Create a new account
              </button>
            </div>

            <p className="mt-6 text-center text-[11px] text-white/20">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;