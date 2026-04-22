import { onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'rmm_app_theme'
const MEDIA_QUERY = '(prefers-color-scheme: dark)'
const currentTheme = ref<Theme>('system')

export function useTheme() {
  /**
   * 将主题应用至 DOM 中
   * @param theme 主题类型
   */
  const applyTheme = (theme: Theme) => {
    const root = document.documentElement

    if (theme === 'system') {
      const prefersDark = window.matchMedia(MEDIA_QUERY).matches
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    }
    else {
      root.setAttribute('data-theme', theme)
    }
  }

  /**
   * 设置主题
   * @param theme 主题类型
   */
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null

    if (saved) {
      currentTheme.value = saved
    }

    applyTheme(currentTheme.value)

    const mediaQuery = window.matchMedia(MEDIA_QUERY)
    mediaQuery.addEventListener('change', () => {
      if (currentTheme.value === 'system') {
        applyTheme('system')
      }
    })
  })

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme: () => {
      setTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
    },
  }
}
