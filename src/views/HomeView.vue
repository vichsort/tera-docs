<script setup>
import { ref, onMounted } from 'vue'
import ApiCardComponent from '@/components/home/ApiCardComponent.vue'

const apiList = ref([]) 
const isLoading = ref(true) 
const errorMsg = ref(null) 

onMounted(async () => {
  try {
    // busca o arquivo que colocamos na pasta /public/docs/
    const response = await fetch('/docs/index.json')

    if (!response.ok) {
      throw new Error(`Erro ao buscar o índice de APIs: ${response.statusText}`)
    }

    // Converte a resposta em JSON e atualiza nossa 'apiList'
    apiList.value = await response.json()
    
  } catch (err) {
    errorMsg.value = err.message
    console.error(err)
  } finally {
    // Independentemente de sucesso ou erro, paramos o "loading"
    isLoading.value = false
  }
})
</script>

<template>
  <div class="home-container">
    
    <div v-if="isLoading" class="loading-state">
      <h2>Carregando documentações...</h2>
      </div>
    
    <div v-else-if="errorMsg" class="error-state">
      <h2>Ocorreu um erro</h2>
      <p>{{ errorMsg }}</p>
    </div>

    <div v-else class="card-grid">
      <ApiCardComponent 
        v-for="api in apiList" 
        :key="api.id" 
        :api="api" 
      />
    </div>

  </div>
</template>

<style scoped>
.home-container {
  padding: 2rem;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  justify-content: center; 
}

.loading-state, .error-state {
  text-align: center;
  padding: 4rem;
  color: #555;
}

.error-state {
  color: #d93025;
}
</style>