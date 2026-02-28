"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createProduct } from "@/app/services/products.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/auth.store";

export default function CreateProductPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { token } = useAuthStore();

  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState<CreateProductDTO>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateProductDTO, string>>
  >({});
  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSuccess(true);
      setFormData({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });
      setErrors({});
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (error) => {
      alert((error as Error).message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "price" ? parseFloat(e.target.value) : e.target.value,
    });

    // Clear error for this field while typing
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProductDTO, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.image.trim()) newErrors.image = "Image URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate(formData);
  };

  useEffect(() => {
    async function getCategories() {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    }
    getCategories();
  }, []);

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token, router]);

  return (
    <section className="py-16 max-w-2xl mx-auto">
      <Link href="/product">
        &#11013;
        <span className="hover:underline">Back to Products</span>
      </Link>
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      {success && (
        <p className="mb-4 text-green-600 font-semibold">
          Product created successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={formData.price || ""}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.price ? "border-red-500" : ""}`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.category ? "border-red-500" : ""}`}
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category} className="capitalize" value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.image ? "border-red-500" : ""}`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700"
        >
          {isPending ? "Creating..." : "Create Product"}
        </button>
      </form>
    </section>
  );
}
