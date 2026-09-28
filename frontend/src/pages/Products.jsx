import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import Navbar from "../components/Navbar";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`/products/${id}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );

      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white">
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

      {/* Reusable Navbar */}

      <Navbar />

      {/* Content */}

      <section className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Heading */}

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium text-amber-400">
              Inventory
            </p>

            <h1 className="text-4xl font-semibold tracking-tight">
              Products
            </h1>

            <p className="mt-3 text-sm text-white/35">
              Manage everything in your product inventory.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
            <span className="text-sm text-white/40">
              Total products
            </span>

            <span className="ml-3 text-lg font-semibold">
              {products.length}
            </span>
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-white/40">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />

              Loading products...
            </div>
          </div>
        )}

        {/* Empty State */}

        {!loading && products.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.02] text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 text-3xl text-amber-400">
              +
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              No products yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/30">
              Your inventory is empty. Add your first product
              to get started.
            </p>

            <button
              onClick={() => navigate("/products/add")}
              className="mt-6 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Add your first product
            </button>
          </div>
        )}

        {/* Products Grid */}

        {!loading && products.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-400/20"
              >
                {/* Image */}

                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-white/[0.02]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-5xl font-black text-white/[0.05]">
                      N
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-lg border border-white/[0.08] bg-black/60 px-3 py-1.5 text-xs text-white/60 backdrop-blur-md">
                    {product.category}
                  </span>
                </div>

                {/* Details */}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {product.name}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/30">
                        {product.description}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-lg font-semibold text-amber-400">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* Stock */}

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="text-xs text-white/30">
                      Stock
                    </span>

                    <span
                      className={`text-sm font-medium ${
                        product.stock > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </div>

                  {/* Actions */}

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/products/edit/${product._id}`
                        )
                      }
                      className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 text-sm font-medium text-white/60 transition hover:border-amber-400/30 hover:text-amber-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      disabled={deletingId === product._id}
                      className="flex-1 rounded-xl border border-red-500/10 bg-red-500/[0.03] py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/30 hover:bg-red-500/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === product._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;