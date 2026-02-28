"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import Sort from "./Sort";
import { sortProducts } from "../utils/sortProducts";

interface IProps {
  products: Product[];
}

const LIMIT = 12;

export default function ProductList({ products }: IProps) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [search, setSearch] = useState("");

  const filteredSorted = useMemo(() => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
    return sortProducts(filtered, sortBy);
  }, [products, search, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * LIMIT;
    return filteredSorted.slice(start, start + LIMIT);
  }, [filteredSorted, page]);

  const totalPages = Math.ceil(filteredSorted.length / LIMIT);

  return (
    <>
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
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 25vw"
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
    </>
  );
}
