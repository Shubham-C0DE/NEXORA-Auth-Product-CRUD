import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, fetchMe } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [productsResponse, currentUser] =
        await Promise.all([
          api.get("/products"),
          fetchMe(),
        ]);

      setProducts(productsResponse.data.products);

      if (!currentUser) {
        toast.error("Unable to load user information.");
      }
    } catch (error) {
      console.log("Dashboard error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const categories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Header */}

        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-amber-400">
            Dashboard
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome
            {user?.name ? `, ${user.name}` : ""}
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage your products and inventory from one place.
          </p>

          {user?.email && (
            <p className="mt-1 text-xs text-white/30">
              {user.email}
            </p>
          )}
        </div>

        {/* Stats */}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Products */}

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-sm text-white/40">
                  Total Products
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {totalProducts}
                </p>
              </div>

              {/* Stock */}

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-sm text-white/40">
                  Total Stock
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {totalStock}
                </p>
              </div>

              {/* Categories */}

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-sm text-white/40">
                  Categories
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {categories}
                </p>
              </div>
            </div>

            {/* Quick Actions */}

            <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <h2 className="text-lg font-semibold">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Manage your inventory quickly.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  onClick={() => navigate("/products")}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium transition hover:bg-white/[0.06]"
                >
                  View Products
                </button>

                <button
                  onClick={() => navigate("/products/add")}
                  className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
                >
                  + Add Product
                </button>

              </div>
            </div>

            {/* System Status */}

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <div>
                <p className="text-sm font-medium">
                  System Operational
                </p>

                <p className="text-xs text-white/40">
                  Authentication and product services are running.
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;