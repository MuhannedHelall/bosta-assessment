"use client";

import { useState } from "react";

export default function Quantity() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() =>
          setCount((prev) => {
            if (prev > 0) return prev - 1;
            return prev;
          })
        }
        className="text-lg py-2 px-4 rounded-md bg-slate-800 text-white hover:bg-slate-700 w-full max-w-20 cursor-pointer"
      >
        -
      </button>
      <span className="py-2 px-4 rounded-md bg-white border border-slate-800 w-full max-w-28 text-center">
        {count}
      </span>
      <button
        onClick={() =>
          setCount((prev) => {
            if (prev < 10) return prev + 1;
            return prev;
          })
        }
        className="text-lg py-2 px-4 rounded-md bg-slate-800 text-white hover:bg-slate-700 w-full max-w-20 cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
