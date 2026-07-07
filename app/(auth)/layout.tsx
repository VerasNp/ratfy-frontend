export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full min-h-screen bg-[var(--bg-main)]">
      {children}
    </main>
  );
}