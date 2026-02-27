import Image from "next/image";

export default function ProductPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto grid gap-y-10 gap-x-6 items-center md:grid-cols-2 grid-cols-1">
        {/* Product Image */}
        <div className="h-full w-full max-h-120 border border-slate-200 rounded-lg flex items-center justify-center">
          <Image
            src="https://v3.material-tailwind.com/coat-1.png"
            alt="Pink Blouse"
            width={400}
            height={500}
            className="object-contain h-full w-auto"
          />
        </div>

        {/* Product Details */}
        <div className="md:p-2">
          <h4 className="font-bold text-xl md:text-2xl lg:text-3xl text-slate-800 dark:text-white">
            Pink Blouse
          </h4>

          <h6 className="font-bold text-base md:text-lg lg:text-xl text-slate-800 my-4">
            $1,490
          </h6>

          <p className="text-base text-slate-600">
            A stylish and elegant pink blouse made from premium materials.
            Perfect for casual and semi-formal occasions.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 my-8">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4].map((star) => (
                <StarIcon key={star} filled />
              ))}
              <StarIcon />
            </div>

            <p className="text-base font-semibold text-slate-600">
              100 Reviews
            </p>
          </div>

          {/* Colors */}
          <h6 className="font-bold text-base md:text-lg lg:text-xl text-slate-800 dark:text-white my-4">
            Color
          </h6>

          <div className="flex gap-2">
            <div className="h-5 w-5 bg-slate-950 rounded cursor-pointer"></div>
            <div className="h-5 w-5 bg-white rounded border border-slate-200 cursor-pointer"></div>
            <div className="h-5 w-5 bg-slate-200 rounded border border-slate-200 cursor-pointer"></div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center gap-2">
            <button className="py-2 px-4 rounded-md bg-slate-800 text-white hover:bg-slate-700 w-full max-w-60">
              Add to Cart
            </button>

            <button className="min-w-9.5 min-h-9.5 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center">
              ❤
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
