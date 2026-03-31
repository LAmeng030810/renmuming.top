import { createI18n } from 'vue-i18n'
import { getSavedLang } from '@/utils/i18nUtils'

const modules = import.meta.glob('./messages/*.{ts,js}', { eager: true })

const messages: Record<string, any> = {}

for (const path in modules) {
  const fileName = path.replace(/^\.\/messages\/(.*)\.(ts|js)$/, '$1')
  messages[fileName] = (modules[path] as any).default || modules[path]
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getSavedLang(),
  messages,
  globalInjection: true, // 全局注入 $t
})

export default i18n
