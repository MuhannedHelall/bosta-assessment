import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Bosta Store
        </h2>
        <Link href="/">login</Link>
      </div>
    </div>
  );
}
