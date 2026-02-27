import Link from "next/link";

export default function Navbar() {
  const isAuth = true;
  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          <Link href="/product">Bosta Store</Link>
        </h2>

        {isAuth ? (
          <div className="flex items-center gap-x-4">
            <span>Welcome {"Muhanned"}</span>
            <Link
              href="/product/add"
              className="px-4 py-1 border rounded hover:bg-gray-700 hover:text-white transition-all"
            >
              Add Product
            </Link>
            <Link
              href="/"
              className="px-4 py-1 border rounded hover:bg-gray-700 hover:text-white transition-all"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Link
              href="/"
              className="px-4 py-1 border rounded hover:bg-gray-700 hover:text-white transition-all"
            >
              login
            </Link>
            <Link
              href="/product/add"
              className="px-4 py-1 border rounded hover:bg-gray-700 hover:text-white transition-all"
            >
              Add Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
