<script setup lang="ts">
import PayForm from "./PayForm.vue"

const props = defineProps<{ 
  initiatorName: string 
  duesTitle: string
}>()

</script>

<template>
<div class="w-[100vw] h-[100vh] pt-[48px] flex justify-center bg-[#F4F5F6]">
  <div class="flex flex-col w-[600px] h-[744px] bg-white p-8 rounded-2xl">
    <p class="font-medium leading-7 text-[23px] w-full">
      {{ props.initiatorName }} собирает на «{{ props.duesTitle }}»
    </p>
    <PayForm class="pt-6 pb-4" />
  </div>
</div>
</template>

<style scoped lang="scss"></style>
