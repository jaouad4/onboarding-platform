"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, logout, UserProfile } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((profile) => {
        if (profile.role !== "USER") {
          router.replace("/admin/dashboard");
          return;
        }
        setUser(profile);
      })
      .catch(() => {
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">Chargement...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-6">
        <span className="font-semibold text-zinc-900">SMODU</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-600">
            {user.firstName} {user.lastName}
          </span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Deconnexion
          </Button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
