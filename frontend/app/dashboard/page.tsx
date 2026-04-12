import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CertificationStatusWrapper } from "@/components/dashboard/CertificationStatusWrapper";

async function getCertificationStatus(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/v1/certifications/my-status`,
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

async function getMe(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/v1/auth/me`,
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

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/login");

  const [user, certStatus] = await Promise.all([
    getMe(token),
    getCertificationStatus(token),
  ]);

  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Bonjour, {user.firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
            Suivez votre progression d&apos;integration ci-dessous.
        </p>
      </div>
      <CertificationStatusWrapper
      status={user.status}
      firstLoginAt={user.firstLoginAt}
      domain={certStatus?.domain ?? user.domain ?? null}
      />
    </div>
  );
}
