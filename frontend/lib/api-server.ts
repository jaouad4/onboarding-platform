import { cookies } from "next/headers"

export async function apiServer(path: string, options?: RequestInit) {
  // Await the cookies() Promise
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1"

  return fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  })
}
