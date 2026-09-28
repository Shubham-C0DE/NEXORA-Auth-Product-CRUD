import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully.");

      navigate("/login");
    } catch (error) {
      toast.error("Unable to logout.");
    }
  };

  return (
    <header className="relative border-b border-white/[0.06] bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400">
            <span className="font-black text-black">
              N
            </span>
          </div>

          <span className="text-lg font-semibold tracking-tight">
            NEX<span className="text-amber-400">ORA</span>
          </span>
        </button>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-white/50 transition hover:text-white"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/products")}
            className="text-sm text-white/50 transition hover:text-white"
          >
            Products
          </button>
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/products/add")}
            className="hidden rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 sm:block"
          >
            + Add Product
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white/60 transition hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;