"use client";

import { useState, useRef, useEffect } from "react";

const options: { label: string; value: SortOption }[] = [
  { label: "Best Rating", value: "rating" },
  { label: "Group Category", value: "category" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
];

export default function Sort({ sortBy, setSortBy }: any) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left font-mono">
      <button
        onClick={() => setOpen(!open)}
        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {options.find((option) => option.value === sortBy)?.label ?? "Sort"}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            <button
              key={"choose"}
              onClick={() => {
                setSortBy(null);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                !sortBy ? "font-medium text-gray-900" : "text-gray-500"
              } hover:bg-gray-100`}
            >
              Sort
            </button>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  sortBy === option.value
                    ? "font-medium text-gray-900"
                    : "text-gray-500"
                } hover:bg-gray-100`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
