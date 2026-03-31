<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const themes = [
  { key: 'light' as const, icon: '☀️', label: 'theme.light' },
  { key: 'dark' as const, icon: '🌙', label: 'theme.dark' },
  { key: 'system' as const, icon: '💻', label: 'theme.system' },
]
</script>

<template>
  <div class="theme-switcher">
    <button
      v-for="t in themes"
      :key="t.key"
      class="btn"
      :class="[{ active: theme === t.key }]"
      @click="setTheme(t.key)"
    >
      <span class="icon">{{ t.icon }}</span>
      <span class="label">{{ $t(t.label) }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.theme-switcher {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--surface);
  border-radius: 0.75rem;
  border: 1px solid var(--border);
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover);
    color: var(--text);
  }

  &.active {
    background: var(--primary);
    color: white;
  }
}

.icon {
  font-size: 0.875rem;
}

.label {
  font-size: 0.8125rem;
  font-weight: 500;
}
</style>
