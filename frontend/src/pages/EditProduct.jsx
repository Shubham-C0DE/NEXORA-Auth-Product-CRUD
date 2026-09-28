import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

const EditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // Fetch existing product

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/products/${id}`);

      const product = response.data.product;

      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        category: product.category || "",
        stock: product.stock ?? "",
        image: product.image || "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load product."
      );

      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle input changes

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Update product

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put(`/products/${id}`, formData);

      toast.success("Product updated successfully.");

      navigate("/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        <div className="flex items-center gap-3 text-sm text-white/40">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />

          Loading product...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}

        <div className="mb-8">
          <button
            onClick={() => navigate("/products")}
            className="mb-5 text-sm text-white/35 transition hover:text-amber-400"
          >
            ← Back to products
          </button>

          <p className="mb-3 text-sm font-medium text-amber-400">
            Inventory
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Edit Product
          </h1>

          <p className="mt-3 text-sm text-white/35">
            Update your product information.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-xl sm:p-9"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name */}

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-medium text-white/50">
                Product name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none transition focus:border-amber-400/60"
              />
            </div>

            {/* Description */}

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-medium text-white/50">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400/60"
              />
            </div>

            {/* Price */}

            <div>
              <label className="mb-2 block text-xs font-medium text-white/50">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none transition focus:border-amber-400/60"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-xs font-medium text-white/50">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none transition focus:border-amber-400/60"
              />
            </div>

            {/* Stock */}

            <div>
              <label className="mb-2 block text-xs font-medium text-white/50">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none transition focus:border-amber-400/60"
              />
            </div>

            {/* Image */}

            <div>
              <label className="mb-2 block text-xs font-medium text-white/50">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none transition focus:border-amber-400/60"
              />
            </div>
          </div>

          {/* Actions */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm font-medium text-white/50 transition hover:bg-white/[0.04] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProduct;