import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MAP: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Ожидает", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  APPROVED: { label: "Одобрено", className: "bg-green-100 text-green-800 border-green-300" },
  REJECTED: { label: "Отклонено", className: "bg-red-100 text-red-800 border-red-300" },
  ACTIVE: { label: "Активно", className: "bg-green-100 text-green-800 border-green-300" },
  CLOSED: { label: "Закрыто", className: "bg-gray-100 text-gray-600 border-gray-300" },
  ADMIN: { label: "Админ", className: "bg-purple-100 text-purple-800 border-purple-300" },
  OWNER: { label: "Владелец", className: "bg-blue-100 text-blue-800 border-blue-300" },
  MANAGER: { label: "Менеджер", className: "bg-blue-50 text-blue-700 border-blue-200" },
  STAFF: { label: "Сотрудник", className: "bg-gray-50 text-gray-700 border-gray-200" },
};

export function StatusBadge({ status }: { status: string }) {
  const conf = MAP[status] ?? { label: status, className: "bg-gray-100 text-gray-600 border-gray-300" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", conf.className)}>
      {conf.label}
    </Badge>
  );
}
