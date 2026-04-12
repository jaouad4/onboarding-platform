"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const CertificationStatus = dynamic(
  () =>
    import("./CertificationStatus").then((m) => m.CertificationStatus),
  { ssr: false }
);

type UserStatus =
  | "PENDING_CERTIFICATION"
  | "CERTIFICATION_SUBMITTED"
  | "CERTIFICATION_VERIFIED"
  | "READY";

interface Props {
  status: UserStatus;
  firstLoginAt: string;
  domain: string | null;
}

export function CertificationStatusWrapper({
  status,
  firstLoginAt,
  domain,
}: Props) {
  const router = useRouter();
  return (
    <CertificationStatus
      status={status}
      firstLoginAt={firstLoginAt}
      domain={domain}
      onRefresh={() => router.refresh()}
    />
  );
}
