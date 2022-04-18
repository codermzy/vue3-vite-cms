<template>
  <div class="nav-header">
    <template v-if="isFold">
      <el-icon class="fold-enum" @click="handleFoldClick"><fold /></el-icon>
    </template>
    <template v-else>
      <el-icon class="unfold-enum" @click="handleFoldClick"><Expand /></el-icon>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'foldChange', idFold: boolean): void
}>()

const isFold = ref(false)

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped>
.fold-enum,
.unfold-enum {
  font-size: 30px;
  cursor: pointer;
}
</style>
