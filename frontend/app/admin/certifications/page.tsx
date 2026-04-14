"use client"

import { useEffect, useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerifyModal } from "@/components/admin/verify-modal"

interface Submission {
  id: string
  submittedAt: string
  primaryVerificationStatus: string
  adminVerificationStatus: string
  primaryVerificationNote: string | null
  adminVerificationNote: string | null
  verifiedAt: string | null
  user: {
    id: string
    firstName: string
    lastName: string
    username: string
    domain: string | null
  }
}

export default function AdminCertificationsPage() {
  const [pending, setPending] = useState<Submission[]>([])
  const [history, setHistory] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [verifyTarget, setVerifyTarget] = useState<Submission | null>(null)

  const fetchPending = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiClient("/certifications/pending")
      const data = await res.json()
      if (data.success) setPending(data.data)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchHistory = useCallback(async () => {
    try {
      const res = await apiClient("/certifications/history")
      const data = await res.json()
      if (data.success) setHistory(data.data)
    } catch {
      // log silencieux
    }
  }, [])

  useEffect(() => {
    fetchPending()
    fetchHistory()
  }, [fetchPending, fetchHistory])

  const handleVerified = () => {
    setVerifyTarget(null)
    fetchPending()
    fetchHistory()
  }

  const downloadPdf = async (submissionId: string, username: string) => {
    const res = await apiClient(`/certifications/${submissionId}/pdf`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `certificat-${username}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  const DOMAIN_LABELS: Record<string, string> = {
    TECHNIQUE: "Technique",
    COMMERCE: "Commerce",
    MARKETING: "Marketing",
    FINANCE: "Finance",
    RH: "RH",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
        <p className="text-gray-500 mt-1">Verification des certificats Odoo soumis</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            En attente ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {loading ? (
            <p className="text-sm text-gray-400">Chargement...</p>
          ) : pending.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-400">Aucune certification en attente de verification</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Utilisateur</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Domaine assigne</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Date de soumission</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pending.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{sub.user.firstName} {sub.user.lastName}</p>
                        <p className="text-gray-500 text-xs">{sub.user.username}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {sub.user.domain ? (DOMAIN_LABELS[sub.user.domain] ?? sub.user.domain) : "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(sub.submittedAt).toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadPdf(sub.id, sub.user.username)}
                          >
                            Telecharger PDF
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setVerifyTarget(sub)}
                          >
                            Verifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          {history.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-400">Aucun historique disponible</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Utilisateur</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Decision</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Note</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{sub.user.firstName} {sub.user.lastName}</p>
                        <p className="text-gray-500 text-xs">{sub.user.username}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={sub.adminVerificationStatus === "APPROVED" ? "default" : "destructive"}>
                          {sub.adminVerificationStatus === "APPROVED" ? "Approuve" : "Rejete"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{sub.adminVerificationNote ?? "-"}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {sub.verifiedAt ? new Date(sub.verifiedAt).toLocaleString("fr-FR") : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {verifyTarget && (
        <VerifyModal
          submission={verifyTarget}
          onClose={() => setVerifyTarget(null)}
          onVerified={handleVerified}
        />
      )}
    </div>
  )
}