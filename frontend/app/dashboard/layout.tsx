import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getMe(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = await getMe(token);

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="text-base font-semibold tracking-tight">
            SMODU Platform
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.firstName} {user.lastName}
            </span>
            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="outline" size="sm">
                Se deconnecter
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-56 border-r border-border bg-card px-4 py-6">
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Mon parcours
            </Link>
          </nav>
        </aside>
        <main className="flex-1 px-8 py-6">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
