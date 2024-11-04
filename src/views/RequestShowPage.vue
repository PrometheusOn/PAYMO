<template>
  <div>
    {{ parsedRequestBody }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const parsedRequestBody = JSON.parse(route.query.requestBody as string);
</script>

<style scoped>

</style>