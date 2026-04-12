"use client";

import { Timer } from "./Timer";
import { UploadCertificat } from "./UploadCertificat";
import { isTimerElapsed } from "@/lib/certification";

type UserStatus =
  | "PENDING_CERTIFICATION"
  | "CERTIFICATION_SUBMITTED"
  | "CERTIFICATION_VERIFIED"
  | "READY";

const DOMAIN_LABELS: Record<string, string> = {
  TECHNIQUE: "Technique",
  COMMERCE: "Commerce",
  MARKETING: "Marketing",
  FINANCE: "Finance",
  RH: "Ressources Humaines",
};

interface CertificationStatusProps {
  status: UserStatus;
  firstLoginAt: string;
  domain: string | null;
  onRefresh: () => void;
}

export function CertificationStatus({
  status,
  firstLoginAt,
  domain,
  onRefresh,
}: CertificationStatusProps) {
  const timerElapsed = isTimerElapsed(firstLoginAt);

  if (status === "PENDING_CERTIFICATION") {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Certification Odoo requise</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pour valider votre parcours d&apos;integration, vous devez obtenir une
            certification Odoo via la plateforme officielle.
          </p>
          <a
            href="https://www.odoo.com/slides/all-slides"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Acceder aux formations Odoo
          </a>
        </div>

        {!timerElapsed ? (
          <Timer firstLoginAt={firstLoginAt} onElapsed={onRefresh} />
        ) : (
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base font-semibold">
              Soumettre votre certificat
            </h3>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              Vous pouvez maintenant deposer votre certificat PDF. Assurez-vous
              que votre nom complet y est bien visible.
            </p>
            <UploadCertificat onSuccess={onRefresh} />
          </div>
        )}
      </div>
    );
  }

  if (status === "CERTIFICATION_SUBMITTED") {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h2 className="text-lg font-semibold text-yellow-900">
          Certificat en cours de verification
        </h2>
        <p className="mt-2 text-sm text-yellow-800">
          Votre certificat a bien ete recu et est en attente de validation par
          un administrateur. Vous serez informe des qu&apos;une decision sera prise.
        </p>
      </div>
    );
  }

  if (status === "CERTIFICATION_VERIFIED") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="text-lg font-semibold text-green-900">
          Certification validee
        </h2>
        <p className="mt-2 text-sm text-green-800">
          Votre certificat a ete approuve. Vous etes affecte au domaine :
        </p>
        {domain && (
          <span className="mt-3 inline-block rounded-md bg-green-700 px-3 py-1 text-sm font-semibold text-white">
            {DOMAIN_LABELS[domain] ?? domain}
          </span>
        )}
      </div>
    );
  }

  if (status === "READY") {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Tableau de bord complet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Votre parcours d&apos;integration est complete. Les fonctionnalites
          avancees seront disponibles ici.
        </p>
      </div>
    );
  }

  return null;
}
