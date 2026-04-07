<script setup lang="ts">
import { SwitchLangBtn, SwitchThemeBtn } from '@/components/ui'
</script>

<template>
  <main class="theme">
    <SwitchLangBtn />
    <SwitchThemeBtn />
    <RouterView />
    <div>
      <span class="p-10 bg-amber-500">lick</span>
    </div>
  </main>
</template>

<style scoped></style>
