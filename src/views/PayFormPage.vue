<script setup lang="ts">
import { ref } from 'vue'
import PayForm from "../components/PayForm.vue"

const initiatorName = ref('Рамазан Файзов')
const duesTitle = ref('Кругосветное путешествие')
</script>

<template>
<div class="w-[100vw] h-[100vh] pt-[48px] flex justify-center bg-[#F4F5F6]">
  <div class="flex flex-col w-[600px] h-min bg-white p-8 rounded-2xl">
    <p class="font-medium leading-7 text-[23px] w-full">
      {{ initiatorName }} собирает на «{{ duesTitle }}»
    </p>
    <PayForm class="pt-6" :initiatorName :duesTitle/>
  </div>
</div>
</template>

<style scoped lang="scss"></style>
