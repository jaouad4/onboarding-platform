"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface UserDetail {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string | null
  domain: string | null
  status: string
  isActive: boolean
  role: string
  firstLoginAt: string | null
  createdAt: string
}

interface UserDetailSheetProps {
  userId: string
  onClose: () => void
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

export function UserDetailSheet({ userId, onClose }: UserDetailSheetProps) {
  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await apiClient(`/users/${userId}`)
        // Optional: You can also type this response if you want, similar to the previous file
        const data = await res.json() as { success: boolean; data: UserDetail }
        if (data.success) setUser(data.data)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detail utilisateur</SheetTitle>
        </SheetHeader>

        {loading ? (
          <p className="text-sm text-gray-400 mt-4">Chargement...</p>
        ) : !user ? (
          <p className="text-sm text-red-500 mt-4">Impossible de charger l utilisateur</p>
        ) : (
          <div className="mt-6 space-y-4">
            <DetailRow label="Nom complet" value={`${user.firstName} ${user.lastName}`} />
            <DetailRow label="Identifiant" value={user.username} />
            <DetailRow label="Email" value={user.email ?? "-"} />
            <DetailRow label="Role" value={user.role} />
            <DetailRow
              label="Domaine"
              value={user.domain ? (DOMAIN_LABELS[user.domain] ?? user.domain) : "-"}
            />
            <DetailRow
              label="Statut"
              value={STATUS_LABELS[user.status] ?? user.status}
            />
            <DetailRow
              label="Compte actif"
              value={user.isActive ? "Oui" : "Non"}
            />
            <DetailRow
              label="Premier login"
              value={user.firstLoginAt ? new Date(user.firstLoginAt).toLocaleString("fr-FR") : "Jamais connecte"}
            />
            <DetailRow
              label="Date de creation"
              value={new Date(user.createdAt).toLocaleDateString("fr-FR")}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-900 mt-0.5">{value}</p>
    </div>
  )
}
