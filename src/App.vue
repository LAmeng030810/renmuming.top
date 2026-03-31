<script setup lang="ts">
import { SwitchLangBtn, SwitchThemeBtn } from '@/components/ui'
</script>

<template>
  <main class="theme">
    <SwitchLangBtn />
    <SwitchThemeBtn />
    <RouterView />
  </main>
</template>

<style scoped lang="scss"></style>
