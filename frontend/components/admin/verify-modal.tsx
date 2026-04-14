"use client"

import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Submission {
  id: string
  user: {
    firstName: string
    lastName: string
    username: string
    domain: string | null
  }
}

interface VerifyModalProps {
  submission: Submission
  onClose: () => void
  onVerified: () => void
}

const DOMAIN_LABELS: Record<string, string> = {
  TECHNIQUE: "Technique",
  COMMERCE: "Commerce",
  MARKETING: "Marketing",
  FINANCE: "Finance",
  RH: "RH",
}

export function VerifyModal({ submission, onClose, onVerified }: VerifyModalProps) {
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDecision = async (decision: "APPROVED" | "REJECTED") => {
    setLoading(true)
    setError("")
    try {
      const res = await apiClient(`/certifications/${submission.id}/verify`, {
        method: "POST",
        body: JSON.stringify({ decision, note: note.trim() || undefined }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.message ?? "Une erreur est survenue")
        return
      }
      onVerified()
    } catch {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Verification du certificat</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-md p-4 text-sm space-y-1">
            <p><span className="font-medium">Utilisateur :</span> {submission.user.firstName} {submission.user.lastName}</p>
            <p><span className="font-medium">Identifiant :</span> {submission.user.username}</p>
            <p>
              <span className="font-medium">Domaine assigne :</span>{" "}
              {submission.user.domain ? (DOMAIN_LABELS[submission.user.domain] ?? submission.user.domain) : "-"}
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="note">Note (optionnelle)</Label>
            <Textarea
              id="note"
              placeholder="Raison du rejet ou commentaire..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => handleDecision("REJECTED")}
              disabled={loading}
            >
              Rejeter
            </Button>
            <Button
              className="flex-1"
              onClick={() => handleDecision("APPROVED")}
              disabled={loading}
            >
              Approuver
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}