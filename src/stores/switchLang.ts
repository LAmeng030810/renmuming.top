import type { Language } from '@/utils/i18nUtils'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSavedLang, saveLang } from '@/utils/i18nUtils'

export const useSwitchLang = defineStore('switchLang', () => {
  const currentLang = ref<Language>(getSavedLang())

  const switchLang = (lang: Language) => {
    currentLang.value = lang
    saveLang(lang)
    import('@/i18n').then(({ default: i18n }) => {
      i18n.global.locale.value = lang
    })
  }

  return { currentLang, switchLang }
})
