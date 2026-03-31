<script setup lang="ts">
import { useSwitchLang } from '@/stores/switchLang'

const { switchLang } = useSwitchLang()
</script>

<template>
  <div>
    <button @click="switchLang('zh_CN')">
      切换中文
    </button>
    <button @click="switchLang('en')">
      Switch english
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
