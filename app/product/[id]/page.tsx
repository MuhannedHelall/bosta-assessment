import { getProduct } from "@/app/services/products.api";
import Image from "next/image";
import Link from "next/link";
import Quantity from "@/app/components/Quantity";

interface IProps {
  params: { id: string };
}
export default async function ProductPage({ params }: IProps) {
  const { id } = await params;

  let product: Partial<Product> = {};

  try {
    product = await getProduct(id);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    product = {};
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 ">
      <Link href="/product">
        &#11013;
        <span className="hover:underline">Back to Products</span>
      </Link>

      <div className="container my-2 mx-auto grid gap-y-10 gap-x-6 items-center md:grid-cols-2 grid-cols-1">
        <div className="relative overflow-hidden w-full h-full border border-slate-200 rounded-lg flex items-center justify-center">
          <Image
            src={product?.image ?? ""}
            alt={product?.title ?? ""}
            fill
            loading="eager"
            className="object-contain aspect-square p-5 bg-gray-200 lg:aspect-auto lg:h-80"
          />
        </div>

        <div className="md:p-2">
          <h4 className="font-bold text-xl md:text-2xl lg:text-3xl text-slate-800 ">
            {product?.title}
          </h4>

          <h6 className="font-bold text-base md:text-lg lg:text-xl text-slate-800 my-4">
            {product?.price} EGP
          </h6>

          <p className="text-base text-slate-600">{product?.description}</p>

          <div className="flex items-center gap-2 my-8">
            <div className="flex text-amber-500">
              {Array.from({
                length: Math.ceil(product?.rating?.rate ?? 0),
              }).map((_, i) => (
                <StarIcon key={`full-${i}`} filled />
              ))}

              {Array.from({
                length: 5 - +Math.ceil(product?.rating?.rate ?? 0),
              }).map((_, i) => (
                <StarIcon key={`empty-${i}`} />
              ))}
            </div>

            <p className="text-base font-semibold text-slate-600">
              {product?.rating?.count} Reviews
            </p>
          </div>

          <h6 className="font-bold text-base md:text-lg lg:text-xl text-slate-800 capitalize">
            {product?.category}
          </h6>

          <div className="mt-6 flex flex-col lg:flex-row items-center gap-2">
            <Quantity />
            <button className="py-2 px-4 rounded-md bg-slate-800 text-white hover:bg-slate-700 w-full max-w-60">
              Add to Cart
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
