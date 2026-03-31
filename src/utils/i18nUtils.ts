import { validateIncludes } from './tools'

const STORAGE_KEY = 'rmm_app_lang'
const DEFAULT_LANG: Language = 'en'

const langList = ['zh_CN', 'en'] as const

type Language = (typeof langList)[number]

function getSavedLang(): Language {
  const saved = localStorage.getItem(STORAGE_KEY) as Language | null
  return validateIncludes(saved, langList) ?? DEFAULT_LANG
}

function saveLang(lang: Language) {
  localStorage.setItem(STORAGE_KEY, lang)
}

export type { Language }
export { getSavedLang, saveLang }
