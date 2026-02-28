"use client";

import Link from "next/link";
import { useAuthStore } from "../stores/auth.store";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { token, username, logout } = useAuthStore();

  const isAuth = !!token;
  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          <Link href="/product">Bosta Store</Link>
        </h2>

        {isAuth ? (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span>
              Welcome <span className="font-bold">{username}</span>
            </span>
            <Link
              href="/product/add"
              className="px-4 py-1 border rounded hover:bg-gray-700 hover:text-white transition-all"
            >
              Add Product
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Link
              href="/"
              className="px-4 py-1 border rounded hover:bg-gray-700 hover:text-white transition-all"
            >
              login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
