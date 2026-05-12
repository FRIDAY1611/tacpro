import type { Locale } from '@/i18n/config'

const localeFieldMap: Record<Locale, string> = {
  en: 'En',
  zh: 'Zh',
  es: 'Es',
  fr: 'Fr',
  ar: 'Ar',
  ru: 'Ru',
}

export function getLocalizedField<T extends Record<string, unknown>>(
  obj: T,
  locale: Locale,
  field: string
): string | undefined {
  const suffix = localeFieldMap[locale] || 'En'
  const key = `${field}${suffix}` as keyof T
  const value = obj[key]
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }
  // fallback to English
  const enKey = `${field}En` as keyof T
  const enValue = obj[enKey]
  if (typeof enValue === 'string') {
    return enValue
  }
  return undefined
}

export function getLocalizedFieldWithFallback<T extends Record<string, unknown>>(
  obj: T,
  locale: Locale,
  field: string
): string {
  return getLocalizedField(obj, locale, field) || ''
}
