"use client"

import { useEffect, useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreateUserModal } from "@/components/admin/create-user-modal"
import { UserDetailSheet } from "@/components/admin/user-detail-sheet"

interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string | null
  domain: string | null
  status: string
  isActive: boolean
  createdAt: string
}

interface PaginatedUsers {
  items: User[]
  total: number
  page: number
  perPage: number
}

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING_CERTIFICATION: { label: "En attente", variant: "secondary" },
  CERTIFICATION_SUBMITTED: { label: "Soumis", variant: "default" },
  CERTIFICATION_VERIFIED: { label: "Verifie", variant: "default" },
  READY: { label: "Pret", variant: "default" },
}

const DOMAIN_LABELS: Record<string, string> = {
  TECHNIQUE: "Technique",
  COMMERCE: "Commerce",
  MARKETING: "Marketing",
  FINANCE: "Finance",
  RH: "RH",
}

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [domainFilter, setDomainFilter] = useState<string>("ALL")
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const perPage = 10

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
      })
      if (statusFilter !== "ALL") params.set("status", statusFilter)
      if (domainFilter !== "ALL") params.set("domain", domainFilter)

      const res = await apiClient(`/users?${params.toString()}`)
      const data = await res.json() as { success: boolean; data: PaginatedUsers }
      
      if (data.success) {
        setUsers(data.data.items)
        setTotal(data.data.total)
      }
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, domainFilter])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleDeactivate = async (userId: string) => {
    if (!confirm("Desactiver cet utilisateur ?")) return
    await apiClient(`/users/${userId}`, {
      method: "DELETE",
    })
    fetchUsers()
  }

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Utilisateurs</h2>
          <p className="text-gray-500 mt-1">{total} utilisateur(s) au total</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>Nouvel utilisateur</Button>
      </div>

      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tous les statuts</SelectItem>
            <SelectItem value="PENDING_CERTIFICATION">En attente</SelectItem>
            <SelectItem value="CERTIFICATION_SUBMITTED">Soumis</SelectItem>
            <SelectItem value="CERTIFICATION_VERIFIED">Verifie</SelectItem>
            <SelectItem value="READY">Pret</SelectItem>
          </SelectContent>
        </Select>

        <Select value={domainFilter} onValueChange={(v) => { setDomainFilter(v); setPage(1) }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par domaine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tous les domaines</SelectItem>
            <SelectItem value="TECHNIQUE">Technique</SelectItem>
            <SelectItem value="COMMERCE">Commerce</SelectItem>
            <SelectItem value="MARKETING">Marketing</SelectItem>
            <SelectItem value="FINANCE">Finance</SelectItem>
            <SelectItem value="RH">RH</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Nom</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Identifiant</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Domaine</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Statut</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Creation</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">Chargement...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">Aucun utilisateur</td>
              </tr>
            ) : users.map((user) => {
              const statusInfo = STATUS_LABELS[user.status] ?? { label: user.status, variant: "outline" as const }
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                    {!user.isActive && <span className="ml-2 text-xs text-red-500">(desactive)</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.username}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email ?? <span className="text-gray-300">-</span>}</td>
                  <td className="px-4 py-3 text-gray-600">{user.domain ? (DOMAIN_LABELS[user.domain] ?? user.domain) : <span className="text-gray-300">-</span>}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{new Date(user.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedUserId(user.id)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Detail
                      </button>
                      {user.isActive && (
                        <button
                          onClick={() => handleDeactivate(user.id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Desactiver
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Page {page} sur {totalPages}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Precedent
            </Button>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              Suivant
            </Button>
          </div>
        </div>
      )}

      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={() => { fetchUsers(); setCreateModalOpen(false) }}
      />

      {selectedUserId && (
        <UserDetailSheet
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  )
}
