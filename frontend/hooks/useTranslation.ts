import { useAppStore } from '@/store/useAppStore'
import translations from '@/utils/translations'

type LanguageCode = 'en' | 'ig' | 'ha' | 'yo'

export function useTranslation() {
  const language = useAppStore((state) => state.language) as LanguageCode
  
  const t = (key: string): string => {
    const keys = key.split('.')
    const lang = translations[language] || translations.en
    
    let value: unknown = lang
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  return { t, language }
}


