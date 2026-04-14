"use client"

import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateUserModalProps {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

const DOMAINS = [
  { value: "TECHNIQUE", label: "Technique" },
  { value: "COMMERCE", label: "Commerce" },
  { value: "MARKETING", label: "Marketing" },
  { value: "FINANCE", label: "Finance" },
  { value: "RH", label: "RH" },
]

export function CreateUserModal({ open, onClose, onCreated }: CreateUserModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    domain: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.firstName.trim()) newErrors.firstName = "Le prenom est obligatoire"
    if (!form.lastName.trim()) newErrors.lastName = "Le nom est obligatoire"
    if (!form.username.trim()) newErrors.username = "Le nom d utilisateur est obligatoire"
    if (!form.password.trim()) newErrors.password = "Le mot de passe est obligatoire"
    if (!form.domain) newErrors.domain = "Le domaine est obligatoire"
    if (form.email && !form.email.endsWith("@smodu.ma")) {
      newErrors.email = "L email doit se terminer par @smodu.ma"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setApiError("")

    try {
      const body: Record<string, string> = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        password: form.password,
        domain: form.domain,
      }
      if (form.email) body.email = form.email

      const res = await apiClient("/users", {
        method: "POST",
        body: JSON.stringify(body),
      })
      const data = await res.json()

      if (!data.success) {
        setApiError(data.message ?? "Une erreur est survenue")
        return
      }

      onCreated()
      setForm({ firstName: "", lastName: "", username: "", email: "", password: "", domain: "" })
    } catch {
      setApiError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouvel utilisateur</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstName">Prenom *</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
              />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="username">Nom d utilisateur *</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email (optionnel)</Label>
            <Input
              id="email"
              type="email"
              placeholder="prenom.nom@smodu.ma"
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            <p className="text-xs text-gray-500">
              {form.email
                ? "Un email de bienvenue sera envoye automatiquement"
                : "Aucun email ne sera envoye. Transmettez les identifiants manuellement."}
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Mot de passe *</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label>Domaine *</Label>
            <div className="grid grid-cols-3 gap-2">
              {DOMAINS.map((d) => (
                <label key={d.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="domain"
                    value={d.value}
                    checked={form.domain === d.value}
                    onChange={(e) => setForm(f => ({ ...f, domain: e.target.value }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{d.label}</span>
                </label>
              ))}
            </div>
            {errors.domain && <p className="text-xs text-red-500">{errors.domain}</p>}
          </div>

          {apiError && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{apiError}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creation..." : "Creer l utilisateur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}