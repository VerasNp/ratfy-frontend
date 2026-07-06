import NavBar from "@/components/generics/NavBar";
import Sidebar from "@/components/generics/Sidebar";
import Player from "@/components/generics/Player";

export default function MainLayout({ children }: { children: React.ReactNode }) {
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