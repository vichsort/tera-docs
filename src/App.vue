<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="tera-docs-container">
    
    <AppHeader />

    <main class="main-content">
      <router-view />
    </main>
    
    </div>
</template>

<style scoped>
.tera-docs-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  flex-grow: 1;
}
</style>