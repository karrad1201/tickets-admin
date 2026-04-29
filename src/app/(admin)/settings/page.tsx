import { ChangePasswordForm } from "./change-password-form";

export default function SettingsPage() {
  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Настройки</h1>
        <p className="text-muted-foreground text-sm mt-1">Управление учётной записью</p>
      </div>
      <ChangePasswordForm />
    </div>
  );
}
