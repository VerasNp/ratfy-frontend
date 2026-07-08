"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/generics/NavBar";
import Sidebar from "@/components/generics/Sidebar";
import Player from "@/components/generics/Player";
import { useUserContext } from "@/app/context/UserContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">
        <div className="flex flex-row h-[calc(100vh-150px)]">
          <Sidebar />
          {children}
        </div>
      </main>
      <Player />
    </>
  );
}