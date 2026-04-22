<script setup lang="ts">
import type { Theme } from '@/composables/useTheme'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const themes = [
  { key: 'light' as const, icon: '/svg/light.svg' },
  { key: 'dark' as const, icon: '/svg/dark.svg' },
]

const appliedTheme = ref<Theme>('light')

// 更新应用主题的函数
function updateAppliedTheme() {
  if (typeof document === 'undefined')
    return

  if (theme.value === 'system') {
    const current = document.documentElement.getAttribute('data-theme') as Theme
    appliedTheme.value = current || 'light'
  }
  else {
    appliedTheme.value = theme.value as Theme
  }
}

// 监听主题变化
watchEffect(() => {
  updateAppliedTheme()
})

// 监听data-theme属性变化（用于system模式）
onMounted(() => {
  if (typeof document === 'undefined')
    return

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-theme') {
        updateAppliedTheme()
      }
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <div class="theme-switcher">
    <div class="slider-track">
      <div class="slider-thumb" :class="appliedTheme" />
    </div>
    <button
      v-for="t in themes"
      :key="t.key"
      class="btn"
      :class="[{ active: appliedTheme === t.key }]"
      @click="setTheme(t.key)"
    >
      <img :src="t.icon" class="icon" alt="svg">
    </button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: inline-flex;
  position: relative;
  gap: 0.125rem;
  padding: 0.375rem;
  transition: all 0.35s;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.theme-switcher:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

.slider-track {
  position: absolute;
  top: 0.375rem;
  left: 0.375rem;
  right: 0.375rem;
  bottom: 0.375rem;
  border-radius: 2rem;
  overflow: hidden;
  pointer-events: none;
  background: color-mix(in srgb, var(--bg-c) 90%, transparent);
  border: 2px solid var(--bg-c-b);
}

.slider-track:hover {
  border: 2px solid #8e8e8e;
}

.slider-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(50% - 0.0625rem);
  height: 100%;
  background: var(--bg);
  border-radius: 2rem;
  transition: left 0.45s;
}

.slider-thumb.light {
  left: 0;
}

.slider-thumb.dark {
  left: calc(50% + 0.0625rem);
}

.btn {
  position: relative;
  z-index: 1;
  padding: 0.625rem 0.75rem;
  border: none;
  border-radius: 1.75rem;
  background-color: transparent;
  color: color-mix(in srgb, var(--text) 80%, transparent);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.icon {
  width: 15px;
  height: 15px;
  color: #fff;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease;
}

.btn.active .icon {
  filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.3));
  transform: scale(1.05);
}
</style>
