<script setup>
import ApiCardComponent from '@/components/home/ApiCardComponent.vue'
import { ref } from 'vue'

// (Aqui fazer o 'fetch' do 'index.json' e 
// preencher 'apiList')
const apiList = ref([
  {
    "id": "bratz-api",
    "nome": "Bratz API",
    "descricao": "API para o sistema de ponto de venda Bratz.",
    "tags": ["Flask", "MariaDB", "Financeiro"]
  },
  {
    "id": "faif-api",
    "nome": "FAIF Middleware",
    "descricao": "Facilitador de acesso a informação.",
    "tags": ["Flask", "Governo"],
    "color": "#d63384";
  }
])
</script>

<template>
  <div class="card-grid">
    <ApiCardComponent 
      v-for="api in apiList" 
      :key="api.id" 
      :api="api" 
    />
  </div>
</template>

<style scoped>
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  justify-content: center;
}
</style>