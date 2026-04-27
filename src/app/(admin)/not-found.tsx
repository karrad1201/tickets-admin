import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h2 className="text-lg font-semibold">Страница не найдена</h2>
      <p className="text-sm text-muted-foreground">
        Запрошенный ресурс не существует или был удалён.
      </p>
      <Link href="/dashboard" className="text-sm text-primary hover:underline">
        На главную
      </Link>
    </div>
  );
}
