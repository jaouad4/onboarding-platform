import { apiServer } from "@/lib/api-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stats {
  total: number
  byStatus: Record<string, number>
  byDomain: Record<string, number>
}

async function getStats(): Promise<Stats | null> {
  try {
    const res = await apiServer("/users?perPage=200")
    const data = await res.json()
    if (!data.success) return null

    const users: any[] = data.data.items

    const byStatus: Record<string, number> = {}
    const byDomain: Record<string, number> = {}

    for (const user of users) {
      byStatus[user.status] = (byStatus[user.status] || 0) + 1
      if (user.domain) {
        byDomain[user.domain] = (byDomain[user.domain] || 0) + 1
      }
    }

    return { total: users.length, byStatus, byDomain }
  } catch {
    return null
  }
}

const STATUS_LABELS: Record<string, string> = {
  PENDING_CERTIFICATION: "En attente de certification",
  CERTIFICATION_SUBMITTED: "Certificat soumis",
  CERTIFICATION_VERIFIED: "Certifie",
  READY: "Pret",
}

const DOMAIN_LABELS: Record<string, string> = {
  TECHNIQUE: "Technique",
  COMMERCE: "Commerce",
  MARKETING: "Marketing",
  FINANCE: "Finance",
  RH: "RH",
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
        <p className="text-gray-500 mt-1">Vue d ensemble de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Total utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{stats?.total ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Par statut</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {stats
              ? Object.entries(stats.byStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between text-sm">
                    <span className="text-gray-600">{STATUS_LABELS[status] ?? status}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))
              : <p className="text-sm text-gray-400">Aucune donnee</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Par domaine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {stats && Object.keys(stats.byDomain).length > 0
              ? Object.entries(stats.byDomain).map(([domain, count]) => (
                  <div key={domain} className="flex justify-between text-sm">
                    <span className="text-gray-600">{DOMAIN_LABELS[domain] ?? domain}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))
              : <p className="text-sm text-gray-400">Aucune donnee</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}