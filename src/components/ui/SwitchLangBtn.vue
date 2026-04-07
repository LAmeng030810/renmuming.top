<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSwitchLang } from '@/stores/switchLang'

const { currentLang } = storeToRefs(useSwitchLang())

const { switchLang } = useSwitchLang()
</script>

<template>
  <div class="lang-switcher">
    <div class="slider-track">
      <div class="slider-thumb" :class="currentLang" />
    </div>
    <button
      class="lang-btn"
      :class="{ active: currentLang === 'zh_CN' }"
      @click="switchLang('zh_CN')"
    >
      <span class="lang-content">
        <span class="text">中文</span>
      </span>
    </button>
    <button
      class="lang-btn"
      :class="{ active: currentLang === 'en' }"
      @click="switchLang('en')"
    >
      <span class="lang-content">
        <span class="text">EN</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.lang-switcher {
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

.lang-switcher:hover {
  background-color: color-mix(in srgb, var(--border) 70%, var(--primary));
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.12),
    0 2px 6px rgba(0, 123, 255, 0.08);
  transform: translateY(-1px);
}

.lang-switcher:active {
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

.slider-thumb.zh_CN {
  left: 0;
}

.slider-thumb.en {
  left: calc(50% + 0.0625rem);
}

.lang-btn {
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

.lang-btn:hover {
  color: var(--primary);
}

.lang-btn.active {
  color: white;
  font-weight: 600;
}

.lang-btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.lang-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}

.text {
  font-size: 0.8125rem;
  white-space: nowrap;
  transition: transform 0.2s ease;
}

.lang-btn:hover .text {
  transform: translateY(-0.5px);
}

.lang-btn.active .text {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
