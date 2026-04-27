import { OperationButton } from "./operation-button";

export default function OperationsPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-2">Операции</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Ручной запуск batch-процессов. Обычно выполняются автоматически по расписанию.
      </p>

      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <h2 className="font-medium mb-1">Закрыть продажи начавшихся событий</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Закрывает продажи для событий, у которых уже наступило время начала.
          </p>
          <OperationButton
            endpoint="/api/operations/close-started-event-sales"
            label="Запустить"
            confirmTitle="Закрыть продажи начавшихся событий?"
          />
        </div>

        <div className="rounded-md border p-4">
          <h2 className="font-medium mb-1">Обработать зависшие платежи</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Отменяет pending-попытки оплаты, у которых истёк срок ожидания.
          </p>
          <OperationButton
            endpoint="/api/operations/process-stale-payments"
            label="Запустить"
            confirmTitle="Обработать зависшие платежи?"
          />
        </div>
      </div>
    </div>
  );
}
