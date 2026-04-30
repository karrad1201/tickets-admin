import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Приводит номер телефона к формату +7XXXXXXXXXX.
 * Принимает любые форматы: 89161234567, 8 (916) 123-45-67,
 * +7-916-123-45-67, 7 916 123 45 67, 9161234567 и т.д.
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return "+7" + digits.slice(1)
  }
  if (digits.length === 10) {
    return "+7" + digits
  }
  return raw.trim()
}
