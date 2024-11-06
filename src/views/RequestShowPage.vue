<template>
  <div class="w-[100vw] h-[100vh] py-[48px] flex justify-center bg-[#F4F5F6]">
    <div class="h-min bg-white rounded-2xl flex flex-col gap-2 p-4">
      <div><ElButton @click="router.go(-1)">Назад</ElButton></div>
      <div v-for="(value ,key) in requestBody">
        {{ key }}: {{ value }}
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useTransactionStore } from '../store/transactionStore';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const transactionStore = useTransactionStore()
const router = useRouter()
const { requestBody } = storeToRefs(transactionStore)

</script>

<style scoped>
.el-button {
  border-radius: 12px;
  height: 52px;
}
</style>