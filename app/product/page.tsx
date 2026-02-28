"use client";

import Image from "next/image";
import Sort from "../components/Sort";
import { sortProducts } from "../utils/sortProducts";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products.api";
import Loader from "../components/Loader";

const LIMIT = 12;

export default function Products() {
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const paginatedProducts = useMemo(() => {
    if (!data) return [];

    // Filter
    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );

    // Sort
    const sorted = sortProducts(filtered, sortBy);

    // Paginate
    const start = (page - 1) * LIMIT;
    const end = start + LIMIT;
    return sorted.slice(start, end);
  }, [data, page, sortBy, search]);

  const totalPages = useMemo(() => {
    if (!data) return 1;

    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );

    return Math.ceil(filtered.length / LIMIT);
  }, [data, search]);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching products</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center mb-16">
          <small className="font-mono antialiased text-base text-slate-800 block font-semibold">
            Tailored Product Search
          </small>
          <h2 className="font-sans antialiased font-bold text-2xl md:text-3xl lg:text-4xl text-slate-800 my-4">
            Find What You Need
          </h2>
          <p className="font-serif antialiased text-base md:text-lg text-slate-600 max-w-3xl text-balance mx-auto">
            Simplify your shopping experience with our intuitive filter system.
            Whether you&#x27;re looking for specific features, price ranges, or
            brands.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <input
            className="border px-2 py-1 rounded w-64 font-mono"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Sort sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {!!paginatedProducts.length ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="w-72 h-72 overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      loading="eager"
                      className="object-contain aspect-square p-5 rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                  </div>
                  <div className="mt-4 flex justify-between gap-x-2">
                    <div>
                      <h3 className="text-sm text-gray-700 line-clamp-2">
                        <a href={`/product/${product.id}`}>
                          <span className="absolute inset-0" />
                          {product.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 text-nowrap">
                      {product.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-12 font-mono">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-1 text-sm border rounded cursor-pointer"
              >
                Previous
              </button>

              <span>
                {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-1 text-sm border rounded cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold font-mono">
              No Products Found
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
