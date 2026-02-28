"use client";

import Logo from "./components/Logo";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/services/auth.api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./stores/auth.store";

export default function Home() {
  const router = useRouter();
  const { login: storeLoginData } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: (data) => {
      storeLoginData(data.token, formData.username);
      router.push("/product"); // redirect after login
    },
    onError: () => {
      setErrors((prev) => ({
        ...prev,
        general: "Invalid username or password",
      }));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // clear field error while typing
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const validate = () => {
    const newErrors = { username: "", password: "", general: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate(formData);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <Logo />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`block w-full rounded-md px-3 py-1.5 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full rounded-md px-3 py-1.5 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-600 text-sm text-center">{errors.general}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
