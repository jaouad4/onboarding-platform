const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getCookie("refresh_token")
  if (!refreshToken) return null

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
    const data = await res.json()
    if (data.success && data.data?.accessToken) {
      setCookie("access_token", data.data.accessToken, 1)
      return data.data.accessToken
    }
    return null
  } catch {
    return null
  }
}

export async function apiClient(path: string, options: RequestInit = {}): Promise<Response> {
  // FIXED: Changed 'let' to 'const'
  const token = getCookie("access_token")

  const makeRequest = (accessToken: string | null) =>
    fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(options.headers ?? {}),
      },
    })

  let response = await makeRequest(token)

  if (response.status === 401) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      response = await makeRequest(newToken)
    } else {
      deleteCookie("access_token")
      deleteCookie("refresh_token")
      window.location.href = "/login"
    }
  }

  return response
}
