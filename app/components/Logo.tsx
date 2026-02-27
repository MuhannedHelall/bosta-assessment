"use client";

import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <div
      className="sm:mx-auto sm:w-full sm:max-w-sm cursor-pointer"
      onClick={() => router.push("/product")}
    >
      <img
        alt="Your Company"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
  );
}
