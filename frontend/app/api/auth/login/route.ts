import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json() as { identifier: string; password: string };

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await apiRes.json() as {
    success: boolean;
    data?: { accessToken: string; refreshToken: string; user: unknown };
    message?: string;
  };

  if (!apiRes.ok || !data.success || !data.data) {
    return NextResponse.json(data, { status: apiRes.status });
  }

  const response = NextResponse.json({ success: true, data: { user: data.data.user } });

  response.cookies.set("access_token", data.data.accessToken, {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 15,
  });

  response.cookies.set("refresh_token", data.data.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
