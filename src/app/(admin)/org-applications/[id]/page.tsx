import { DetailRow } from "@/components/detail-row";
import { getAuthContext } from "@/lib/auth";
import { getOrgApplication } from "@/lib/api/org-applications";
import { StatusBadge } from "@/components/status-badge";
import { OrgApplicationActions } from "./actions";
import Link from "next/link";

export default async function OrgApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();
  const app = await getOrgApplication(ctx, id);

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/org-applications" className="text-sm text-muted-foreground hover:underline">
          ← Заявки на организации
        </Link>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{app.organizationName}</h1>
        <StatusBadge status={app.status} />
      </div>

      <div className="rounded-md border divide-y text-sm mb-6">
        <DetailRow label="ID заявки" value={app.id} mono />
        <DetailRow label="Заявитель" value={app.applicantUserId} mono />
        <DetailRow label="Дата подачи" value={app.createdAt?.slice(0, 10) ?? "—"} />
        <DetailRow label="Статус" value={<StatusBadge status={app.status} />} />
      </div>

      {app.status === "PENDING" && (
        <OrgApplicationActions id={app.id} />
      )}
    </div>
  );
}

