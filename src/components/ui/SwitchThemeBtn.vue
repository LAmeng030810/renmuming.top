<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const themes = [
  { key: 'light' as const, icon: '☀️', label: 'theme.light' },
  { key: 'dark' as const, icon: '🌙', label: 'theme.dark' },
]

const appliedTheme = ref<'light' | 'dark'>('light')

// 更新应用主题的函数
function updateAppliedTheme() {
  if (typeof document === 'undefined') {
    return
  }

  if (theme.value === 'system') {
    const current = document.documentElement.getAttribute('data-theme') as
      | 'light'
      | 'dark'
    appliedTheme.value = current || 'light'
  }
  else {
    appliedTheme.value = theme.value as 'light' | 'dark'
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
      <span class="theme-content">
        <span class="icon">{{ t.icon }}</span>
        <span class="label">{{ $t(t.label) }}</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: inline-flex;
  position: relative;
  gap: 0.125rem;
  padding: 0.375rem;
  background-color: var(--border);
  border-radius: 2.5rem;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 9rem;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.theme-switcher:hover {
  background-color: color-mix(in srgb, var(--border) 70%, var(--primary));
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.12),
    0 2px 6px rgba(0, 123, 255, 0.08);
  transform: translateY(-1px);
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
  background: color-mix(in srgb, var(--border) 90%, transparent);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.slider-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(50% - 0.0625rem);
  height: 100%;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary) 90%, white) 0%,
    var(--primary) 50%,
    color-mix(in srgb, var(--primary) 90%, #1a6bc2) 100%
  );
  border-radius: 2rem;
  transition: left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1.2);
  box-shadow:
    0 3px 15px rgba(0, 123, 255, 0.3),
    0 1px 4px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.4),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  color: var(--primary);
}

.btn.active {
  color: white;
  font-weight: 600;
}

.btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.theme-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}

.icon {
  font-size: 1rem;
  line-height: 1;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease;
}

.label {
  font-size: 0.8125rem;
  white-space: nowrap;
  transition: transform 0.2s ease;
}

.btn:hover .icon {
  transform: scale(1.1);
}

.btn:hover .label {
  transform: translateY(-0.5px);
}

.btn.active .icon {
  filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.3));
  transform: scale(1.05);
}

.btn.active .label {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
