"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/app/services/auth.api";
import { useAuthStore } from "../stores/auth.store";

export default function LogoutButton() {
  const router = useRouter();
  const { logout: clearLoginData } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearLoginData();
      router.push("/");
      router.refresh(); // important to re-check middleware
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="px-4 py-1 border rounded hover:bg-gray-700 hover:text-white transition-all"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
